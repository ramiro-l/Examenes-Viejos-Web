import { GithubRepository } from "../github/repository";
import { EXAMENES_VIEJOS_IGNORED_FILES } from "./constants";
import TEST_FECTHED_MATERIA from "./examples-fetch/test-fetched-materia";
import type { IMateriaRepository } from "./types";
import type { Examen, ExamenType } from "@/models/examen";
import { isValidExamenType } from "@/models/examen";
import { githubPdfViewer } from "../viewer";
import { parserGithubRepositoryUrlToOwnerAndRepo } from "../github/repository";
import dotenv from "dotenv";

dotenv.config();

const QUOTE_BY_NUMBER_ERROR = 10;

export class MateriaRepository extends GithubRepository implements IMateriaRepository {
    exams: Examen[] = [];
    private isTest: boolean;

    constructor(repo_url: string, path?: string, test = false) {
        const { owner, repository } = parserGithubRepositoryUrlToOwnerAndRepo(repo_url);
        super(owner, repository, path);
        this.isTest = test;
    }

    async fetchContent() {
        if (this.isTest || !process.env.GITHUB_ACCESS_TOKEN) {
            this.content = TEST_FECTHED_MATERIA;
        } else {
            await super.fetchContent();
        }

        this.setExams();
    }

    private setExams() {
        if (this.content === undefined) {
            throw new Error("Content not fetched in ExamenesViejosRepository");
        }

        if (this.exams.length !== 0) {
            return;
        }

        const exams_of_content = this.content.filter((file) => {
            return !EXAMENES_VIEJOS_IGNORED_FILES.includes(file.path);
        });

        this.exams = exams_of_content.map((file) => {
            const { type, number, date, file_type } = this.nameParser(file.path);
            return {
                type,
                number,
                date,
                file_name: file.path,
                file_type,
                git_url: file.git_url,
                web_url: file.html_url,
                view_url: githubPdfViewer(file.html_url),
                download_url: file.download_url,
            };
        });
    }

    /* This function parser the name of the subjet in
     *  the repository ExamenesViejos.
     *  Example 1:
     *  'Final 2012-12-05.pdf'
     *  {
     *   type: 'Final',
     *   date: '2012-12-05',
     *   file_type: 'pdf'
     *  }
     *
     *  Example 2:
     *  'Parcial 1 2021-04-16 (Tema 2).pdf'
     *  {
     *   type: 'Parcial',
     *   number: 1,
     *   tema: '2',
     *   date: '2021-04-16',
     *   file_type: 'pdf'
     *  }
     */
    private nameParser(name: string): {
        type: ExamenType;
        number?: number;
        date: string;
        file_type: string;
    } {
        let [type, ...rest] = name.split(" ");
        if (!isValidExamenType(type)) {
            type = "Otro";
        }

        let number: number = 0;
        let date: string = "sin fecha";
        let more: string = "";
        for (let i = 0; i < rest.length; i++) {
            // Remove the format file at the end of the name.
            let text = rest[i].split(".")[0];

            // Detect is number of exam.
            if (text.match(/^\d+$/) && !text.match(/^\d{4}-\d{2}-\d{2}$/)) {
                number = parseInt(text);
                continue;
            }

            // Detect is date of exam.
            if (text.match(/^\d{4}-\d{2}-\d{2}$/)) {
                date = text;
                continue;
            }

            if (text !== "sin" && text !== "fecha" && text !== "(sin" && text !== "fecha)") {
                more += text + " ";
            }
        }

        const file_type = name.split(".").pop();
        return {
            type: type as ExamenType,
            date: date,
            number: number,
            file_type: file_type || "",
        };
    }

    /** Sort the exams by date. in format YYYY-MM-DD and "sin fecha".
     *  The biggest date is first and the "sin fecha" is last. */
    public sortExamsByDate() {
        this.exams.sort((a, b) => {
            if (a.date === "sin fecha") {
                return 1;
            }
            if (b.date === "sin fecha") {
                return -1;
            }
            return b.date.localeCompare(a.date);
        });
    }

    public getExamsByType(type: ExamenType): Examen[] {
        return this.exams.filter((exam) => exam.type === type);
    }

    // In index 0 use for the weird numbers, recomended use of type "Otro".
    public getExamsParcialesForNumber(): Examen[][] {
        const parciales = this.getExamsByType("Parcial");
        const max_number = this.getMaxNumberExamByType("Parcial");
        const parciales_by_number: Examen[][] = Array.from({ length: max_number + 1 }, () => []);

        parciales.forEach((parcial) => {
            if (parcial.number && parcial.number <= QUOTE_BY_NUMBER_ERROR) {
                parciales_by_number[parcial.number].push(parcial);
            } else {
                parciales_by_number[0].push(parcial);
            }
        });

        return parciales_by_number;
    }

    // Get the max number of parcial. The number must be less than QUOTE_BY_NUMBER_ERROR.
    private getMaxNumberExamByType(type: ExamenType): number {
        const exams = this.getExamsByType(type);
        if (exams.length === 0) {
            return 0;
        }
        return exams.reduce(
            (max, examen) =>
                Math.max(
                    max,
                    examen.number && examen.number <= QUOTE_BY_NUMBER_ERROR ? examen.number : 1,
                ),
            1,
        );
    }
}

export function parse_curtimestre_number_to_text(cuatrimestre: number): String {
    switch (cuatrimestre) {
        case 1:
            return "Primer";
        case 2:
            return "Segundo";
        case 3:
            return "Tercer";
        case 4:
            return "Cuarto";
        default:
            return "Desconocido";
    }
}

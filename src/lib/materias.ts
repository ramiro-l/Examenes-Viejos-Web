import type { Materia } from "@/models/materia";
import type { Examen } from "@/models/examen";
import type { CarreraCode } from "@/models/carrera";

import { MateriaRepository } from "@/services/examenes/materia_repository";

export function materias_only_for_the_carrera(
    carrera: CarreraCode,
    materias: Materia[],
): Materia[] {
    return materias.filter((materia) => materia.carreras.includes(carrera));
}

// Organize materias by anio and cuatrimestre
export function organizeMaterias(materias: Materia[]): Materia[][][] {
    // Determine the maximum number of years and semesters
    const cant_anios = materias.reduce((max, materia) => Math.max(max, materia.anio), 0);
    const cant_cuatrimestres = materias.reduce(
        (max, materia) => Math.max(max, materia.cuatrimestre),
        0,
    );

    const organize_materias: Materia[][][] = Array.from({ length: cant_anios }, () =>
        Array.from({ length: cant_cuatrimestres }, () => []),
    );
    materias.forEach((materia) => {
        const anioIndex = materia.anio - 1;
        const cuatrimestreIndex = materia.cuatrimestre - 1;
        organize_materias[anioIndex][cuatrimestreIndex].push(materia);
    });
    return organize_materias;
}

export interface TabExmenes {
    title: string;
    key: string;
    examenes: Examen[];
    shorTitle: string;
}

export async function getTabsForMateria(materia: Materia, path?: string): Promise<TabExmenes[]> {
    const materiaRepository = new MateriaRepository(materia.repo_examenes, path);

    await materiaRepository.fetchContent();
    materiaRepository.sortExamsByDate();

    const finales: Examen[] = materiaRepository.getExamsByType("Final");
    const parciales: Examen[][] = materiaRepository.getExamsParcialesForNumber();
    const otros: Examen[] = materiaRepository.getExamsByType("Otro");
    otros.concat(parciales[0]); // In this position are the parciales without or weird numbers.
    parciales.shift();

    const tabs: TabExmenes[] = [
        { title: "Finales", key: "finales", examenes: finales, shorTitle: "FINALES" },
    ];

    tabs.push(
        ...parciales.map((parciales, index) => ({
            title: `Parcial ${index + 1}`,
            key: `parcial-${index + 1}`,
            examenes: parciales,
            shorTitle: `P${index + 1}`,
        })),
    );
    tabs.push({ title: "Otros", key: "otros", examenes: otros, shorTitle: "OTROS" });

    return tabs;
}

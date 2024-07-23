import { GithubRepository } from "../github/repository";
import type { Examen } from "@/models/examen";

export interface IMateriaRepository extends GithubRepository {
    exams: Examen[];
}

import type { CarreraCode } from "./carrera";

export interface Optativa {
    name: string;
    code: string;
    carrera: CarreraCode[];
    repo_examenes: string;
}

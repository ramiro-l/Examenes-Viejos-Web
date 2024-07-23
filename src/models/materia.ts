import type { CarreraCode } from "./carrera";

export interface Materia {
    name: string;
    code: string;
    carreras: CarreraCode[];
    cuatrimestre: number;
    anio: number;
    web: string;
    repo_examenes: string;
    path?: string;
}

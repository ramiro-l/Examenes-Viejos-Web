export type CarreraCode = "lcc" | "ac";

export interface Carrera {
    code: CarreraCode;
    name: string;
    facultad: string;
    duracion: number;
    web: string;
    repo_examenes: string;
}

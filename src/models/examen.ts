export interface Examen {
    type: ExamenType;
    date: string | "sin fecha";
    number?: number;
    file_type: string;
    file_name: string;
    git_url: string;
    web_url: string;
    view_url: string;
    download_url: string;
}

export type ExamenType = "Parcial" | "Final" | "Otro";
export function isValidExamenType(type: string): type is ExamenType {
    return ["Parcial", "Final", "Recuperatorio"].includes(type);
}

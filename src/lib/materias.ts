import type { Materia } from "@/models/materia";
import type { CarreraCode } from "@/models/carrera";

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

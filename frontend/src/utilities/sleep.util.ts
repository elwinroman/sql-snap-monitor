/**
 * Pausa la ejecución por una cantidad de milisegundos.
 *
 * @param ms - Tiempo en milisegundos a esperar.
 * @returns Una promesa que se resuelve después del tiempo especificado.
 *
 * @example
 * await sleep(1000) // Espera 1 segundo
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

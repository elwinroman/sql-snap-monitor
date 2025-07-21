export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
export const MODE = import.meta.env.MODE ?? 'enviroment'

export const APP_NAME = 'Snap Monitor'

// Basado en el tiempo promedio de reacción de un ser humano (en milisegundos)
export const DEBOUNCE_DELAY = 300

// Monaco editor options
export const MAX_FONT_SIZE = 16
export const MIN_FONT_SIZE = 12
export const EDITOR_BANNER = String.raw`
/****************************************************************************************/
/*     ______  _____ _______ __   _ _    _ _______ __   _ _____ ______   _____    /     */
/*     |_____]   |   |______ | \  |  \  /  |______ | \  |   |   |     \ |     |  /      */
/*     |_____] __|__ |______ |  \_|   \/   |______ |  \_| __|__ |_____/ |_____| .       */
/*                                                                                      */
/*                                  REALIZA TU CONSULTA                                 */
/*                                                                                      */
/****************************************************************************************/    
`

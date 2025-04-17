export const EDITOR_OPTIONS = {
  MAX_FONT_SIZE: 16,
  MIN_FONT_SIZE: 12,
}

// Basado en el tiempo promedio de reacción de un ser humano (en milisegundos)
export const DEBOUNCE_DELAY = 300

export const TYPE_ACTION = {
  sqldefinition: {
    id: 1,
    name: 'sqldefinition',
  },
  usertable: {
    id: 2,
    name: 'usertable',
  },
}

export const APP_NAME = 'SQL Snap Monitor'

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

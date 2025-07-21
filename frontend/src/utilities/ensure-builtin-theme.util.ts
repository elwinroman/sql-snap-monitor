/**
 * Lista de valores válidos para la propiedad `base` en un tema de Monaco.
 * - `'vs'`: Tema claro por defecto.
 * - `'vs-dark'`: Tema oscuro por defecto.
 * - `'hc-black'`: Tema de alto contraste.
 */
const validBases = ['vs', 'vs-dark', 'hc-black'] as const

/** Tipo que representa los temas base válidos que Monaco acepta. */
type BuiltinTheme = (typeof validBases)[number]

/**
 * Asegura que el valor `base` sea uno de los temas válidos reconocidos por Monaco.
 *
 * @param base - El valor de base proporcionado (puede venir de un archivo JSON o fuente externa).
 * @returns El valor validado como `BuiltinTheme`. Si no es válido, retorna `'vs'` como valor por defecto.
 *
 * @example
 * ensureBuiltinTheme('vs-dark') // 'vs-dark'
 * ensureBuiltinTheme('custom-dark') // 'vs' (con advertencia en consola)
 */
export const ensureBuiltinTheme = (base: string): BuiltinTheme => {
  if (validBases.includes(base as BuiltinTheme)) {
    return base as BuiltinTheme
  }
  console.warn(`[Monaco Theme] base inválida: "${base}", usando 'vs' por defecto.`)
  return 'vs'
}

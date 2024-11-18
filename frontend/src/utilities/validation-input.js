/**
 * Valida el valor de un input asegurándose de que cumpla con las reglas definidas.
 *
 * @param {Object} param - Objeto que contiene el valor del input.
 * @param {string} param.value - El valor del input a validar.
 * @returns {Object} Un objeto con el estado de la validación y un mensaje asociado.
 *   - `isValid` (boolean): Indica si el valor es válido.
 *   - `msg` (string): Mensaje descriptivo del estado de la validación.
 *
 */
export function validationInput({ value }) {
  const sanitizeValue = value.trim()

  if (sanitizeValue === '') return { isValidate: false, msg: 'El campo es requerido' }
  if (sanitizeValue.length < 3) return { isValidate: false, msg: 'El campo debe ser mayor a 3 caracteres' }
  if (sanitizeValue.length > 128) return { isValidate: false, msg: 'Haz sobrepasado el máximo de caracteres permitidos' }
  return { isValidate: true, msg: '' }
}

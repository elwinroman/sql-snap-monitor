/**
 * Obtiene uno o varios objeto(s) por su nombre
 *
 * @param {Object} param
 * @param {string} param.name - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function getObject({ name }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/${name}`,
      {
        credentials: 'include',
      },
    )
    const res = await response.json()

    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Obtiene la definición de un objeto por su object_id
 *
 * @param {Object} param
 * @param {string} param.id - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function getDefinition({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/definition/${id}`,
      {
        credentials: 'include',
      },
    )
    const res = await response.json()
    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Obtiene la descripción de un objeto por su object_id (por ahora soporta solo USER_TABLE)
 *
 * @param {Object} param
 * @param {string} param.id - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function getDescription({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/description/${id}`,
      {
        credentials: 'include',
      },
    )
    const res = await response.json()
    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Busca un objeto que tenga una definición SQL por su nombre
 *
 * @param {Object} param
 * @param {string} param.name - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function findSQLDefinitionObject({ name }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/objects/sqldefinition?search=${name}`,
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
export async function getSQLDefinitionObject({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/objects/sqldefinition/${id}`,
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
 * Busca un usertable por su nombre
 *
 * @param {Object} param
 * @param {string} param.name - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function findUserTable({ name }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/objects/usertable?search=${name}`,
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
 * Obtiene la información de un usertable por su ID
 *
 * @param {Object} param
 * @param {string} param.id - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function getUserTable({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/objects/usertable/${id}`,
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

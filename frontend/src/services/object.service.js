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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/sqldefinition?search=${name}`, {
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Obtiene la definición de un objeto por su object_id (de la base de datos de conexión o de alineación)
 *
 * @param {Object} param
 * @param {string} param.id - Id del objeto
 * @param {string} param.fromAligment - Si es objeto de alineación o no (opcional - default false)
 *
 * @returns {Promise}
 */
export async function getSQLDefinitionObject({ id }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/sqldefinition/${id}`, {
      credentials: 'include',
    })
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/usertable?search=${name}`, {
      credentials: 'include',
    })
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
 * @param {string} param.id - Id del objeto
 *
 * @returns {Promise}
 */
export async function getUserTable({ id }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/usertable/${id}`, {
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Obtiene la definición de un objeto por su nombre e idSchema (de la base de datos de alineación)
 *
 * @param {Object} param
 * @param {string} param.name - Nombre del objeto
 * @param {number} param.schemaId - Id del schema
 *
 * @returns {Promise}
 */
export async function getSQLDefinitionAligmentObject({ name, schemaName, useCredentials = false, isComparisonMode = false }) {
  // comparasinMode = true, solo cuando se está realizando la comparación
  const comparisonMode = isComparisonMode ? '&isComparisonMode=true' : ''
  const queryParams = `?name=${name}&schemaName=${schemaName}${comparisonMode}`

  try {
    // para los logs de búsqueda useCredentials = true
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/sqldefinition-aligment${queryParams}`, {
      credentials: useCredentials ? 'include' : 'omit',
    })
    const res = await response.json()

    return res
  } catch (error) {
    return { error }
  }
}

import { API_URL } from '@/enviroment/enviroment'

let controller

/**
 * Obtiene las sugerencias de un objeto por su nombre
 *
 * @param {Object} param
 * @param {string} param.search - Nombre del objeto de búsqueda (caracter por caracter)
 * @param {number} param.type - Tipo de búsqueda (sqldefinition, usertable) hasta ahora, si es vacio, busca todo
 *
 * @returns {Promise}
 */
export async function getSearchSuggestions({ search, type }) {
  const searchParam = `search=${search}`
  const typeParam = `type=${type}`

  const queryParams = type ? `?${searchParam}&${typeParam}` : `?${searchParam}`

  try {
    if (controller) controller.abort()
    controller = new AbortController()
    const signal = controller.signal

    const response = await fetch(`${API_URL}/objects${queryParams}`, {
      credentials: 'include',
      signal,
    })
    const res = await response.json()

    const formattedData = res.data.map((obj) => ({
      objectId: obj.id,
      cSchema: obj.schemaName,
      cNombreObjeto: obj.name,
      cTypeDesc: obj.typeDesc,
    }))

    return { data: formattedData }
  } catch (err) {
    if (err.name === 'AbortError') return err
    throw new Error(err)
  }
}

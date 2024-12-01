let controller

/**
 * Obtiene la definición de un objeto por su nombre e idSchema (de la base de datos de alineación)
 *
 * @param {Object} param
 * @param {string} param.search - Nombre del objeto de búsqueda (caracter por caracter)
 * @param {number} param.type - Tipo de búsqueda (sqldefinition, usertable) hasta ahora, si es vacio, busca todo
 *
 * @returns {Promise}
 */
export async function getSearchSuggestions({ search, type }) {
  // if (type == null) {
  //   if (controller) controller.abort()
  //   return
  // }
  const searchParam = `search=${search}`
  const typeParam = `type=${type}`

  const queryParams = type ? `?${searchParam}&${typeParam}` : `?${searchParam}`

  try {
    if (controller) controller.abort()

    controller = new AbortController()
    const signal = controller.signal

    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects${queryParams}`, {
      credentials: 'include',
      signal,
    })
    const res = await response.json()

    return res
  } catch (err) {
    if (err.name === 'AbortError') return err
    throw new Error(err)
  }
}

/**
 * Obtiene una lista de búsquedas recientes
 *
 * @param {Object} param
 * @param {string} param.idTipoAccion - Id del tipo de acción (sqldefinition, usertable)
 *
 * @returns {Promise}
 */
export async function obtenerBusquedasRecientes({ idTipoAccion, start = null, limit = null }) {
  const startParam = start ? `&start=${start}` : ''
  const limitParam = limit ? `&limit=${limit}` : ''

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/objects/busqueda-reciente?idTipoAccion=${idTipoAccion}${startParam}${limitParam}`,
      {
        credentials: 'include',
      },
    )
    const res = await response.json()

    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Elimina un elemento de la búsqueda reciente
 *
 * @param {Object} param
 * @param {string} param.id - Id de la búsqueda reciente
 *
 * @returns {Promise}
 */
export async function eliminarBusquedaReciente({ id }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/busqueda-reciente/${id}`, {
      method: 'PATCH',
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Agrega un nuevo item a la búsqueda reciente
 *
 * @param {Object} param
 * @param {string} param.idTipoAccion - Id del tipo de acción (sqldefinition, usertable)
 * @param {string} param.cSchema - Nombre del esquema
 * @param {string} param.cNombreObjeto - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function registrarBusquedaReciente({ idTipoAccion, cSchema, cNombreObjeto }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/busqueda-reciente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idTipoAccion, cSchema, cNombreObjeto }),
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Elimina todas las búsquedas recientes
 */
export async function eliminarTodoBusquedasRecientes({ idTipoAccion }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects/busqueda-reciente/all/tipo-accion/${idTipoAccion}`, {
      method: 'PATCH',
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (err) {
    throw new Error(err)
  }
}

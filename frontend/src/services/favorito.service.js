import { API_URL } from '@/enviroment/enviroment'

/**
 * Obtiene una lista de las búsquedas favoritas
 *
 * @param {Object} param
 * @param {string} param.idTipoAccion - Id del tipo de acción (sqldefinition, usertable)
 *
 * @returns {Promise}
 */
export async function obtenerFavoritos({ idTipoAccion, start = null, limit = null }) {
  const startParam = start ? `&start=${start}` : ''
  const limitParam = limit ? `&limit=${limit}` : ''

  try {
    const response = await fetch(`${API_URL}/objects/favorito?idTipoAccion=${idTipoAccion}${startParam}${limitParam}`, {
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Elimina un elemento de favoritos
 *
 * @param {Object} param
 * @param {string} param.id - Id del favorito
 *
 * @returns {Promise}
 */
export async function eliminarFavorito({ id }) {
  try {
    const response = await fetch(`${API_URL}/objects/favorito/${id}`, {
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
 * Agrega un nuevo item a los favoritos
 *
 * @param {Object} param
 * @param {string} param.idTipoAccion - Id del tipo de acción (sqldefinition, usertable)
 * @param {string} param.cSchema - Nombre del esquema
 * @param {string} param.cNombreObjeto - Nombre del objeto
 *
 * @returns {Promise}
 */
export async function registrarFavorito({ idTipoAccion, cSchema, cNombreObjeto }) {
  try {
    const response = await fetch(`${API_URL}/objects/favorito`, {
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

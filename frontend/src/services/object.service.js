import { API_URL } from '@/enviroment/enviroment'

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
    const response = await fetch(`${API_URL}/objects/usertable/${id}`, {
      credentials: 'include',
    })
    const res = await response.json()

    return res
  } catch (error) {
    throw new Error(error)
  }
}

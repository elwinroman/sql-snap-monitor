/**
 * Función para autenticar a un usuario
 *
 * @params {Object} credentials - Credenciales sql del usuario (server, database, user, password)
 *
 * @returns {Promise} - Objeto con la información de la autenticación del usuario
 */
export async function login({ credentials }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const res = await response.json()
    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Función para cerrar la sesión del usuario
 *
 * @returns {Promise} - Objeto con la información
 */
export async function logout() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    const res = await response.json()
    return res
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Función para verificar la sesión del usuario
 *
 * @returns {Promise} - Objeto con la información de la sesión del usuario
 */
export async function checkSession() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/health`, {
      credentials: 'include',
    })

    const res = await response.json()
    return res
  } catch (err) {
    // error de conexión con la API
    if (err instanceof TypeError) console.error(err)
    // throw new Error(err)
  }
}

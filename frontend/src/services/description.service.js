const BASE_URL = 'http://localhost:3000'

export async function getDescription({ id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/object/description/${id}`)
    const res = await response.json()
    return res
  } catch (error) {
    throw new Error(error)
  }
}

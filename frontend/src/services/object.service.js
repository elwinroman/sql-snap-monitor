const BASE_URL = 'http://localhost:3000'

export async function getObject({ name }) {
  try {
    const response = await fetch(`${BASE_URL}/api/object/${name}`)
    const res = await response.json()

    return res
  } catch (error) {
    throw new Error(error)
  }
}

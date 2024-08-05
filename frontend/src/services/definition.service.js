export async function getDefinition({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/definition/${id}`,
    )
    const res = await response.json()
    return res
  } catch (error) {
    throw new Error(error)
  }
}

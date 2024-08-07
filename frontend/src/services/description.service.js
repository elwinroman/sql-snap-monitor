export async function getDescription({ id }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/description/${id}`,
      {
        credentials: 'include',
      },
    )
    const res = await response.json()
    return res
  } catch (error) {
    throw new Error(error)
  }
}

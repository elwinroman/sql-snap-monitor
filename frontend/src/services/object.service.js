export async function getObject({ name }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/object/${name}`,
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

import { useState } from 'react'

export const useOpenDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  const updateOpen = (state: boolean) => setOpen(state)

  return { open, updateOpen }
}

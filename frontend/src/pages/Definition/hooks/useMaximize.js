import { useState } from 'react'

export function useMaximize() {
  const [maximize, setMaximize] = useState(false)

  const toggleMaximize = (e) => {
    setMaximize(!maximize)
  }

  return {
    maximize,
    toggleMaximize,
  }
}

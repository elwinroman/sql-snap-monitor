import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { copyToClipboard } from '@/utilities'

export function CopyClipboard({ text }) {
  const [copy, setCopy] = useState(false)

  // copy to clipboard
  const handleCopy = () => {
    copyToClipboard({ text })
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, '1500')
  }

  return (
    <button
      className={`invisible grid h-7 w-7 place-content-center rounded-md border-border bg-border opacity-0 shadow-md backdrop-blur-md transition-colors before:absolute before:-translate-x-2 before:translate-y-7 before:-rotate-12 before:text-sm before:font-bold before:text-rose-500 before:transition-all before:content-['Copiado!'] hover:bg-baselayer group-hover:visible group-hover:opacity-100 ${copy ? 'before:visible before:opacity-100' : 'before:invisible before:opacity-0'}`}
      onClick={handleCopy}
    >
      {!copy ? <Copy size={14} className="text-primary" /> : <Check size={14} className="text-primary" />}
    </button>
  )
}
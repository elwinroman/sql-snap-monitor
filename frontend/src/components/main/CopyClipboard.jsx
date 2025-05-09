import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            className={`mix-colored-background border-border invisible z-[999] grid h-7 w-7 place-content-center rounded-md bg-slate-700 opacity-0 shadow-md backdrop-blur-md transition-colors duration-300 group-hover:visible group-hover:opacity-100 before:absolute before:-translate-x-2 before:translate-y-7 before:-rotate-12 before:text-sm before:font-bold before:text-rose-500 before:transition-all before:content-['Copiado!'] hover:bg-slate-800 ${copy ? 'before:visible before:opacity-100' : 'before:invisible before:opacity-0'}`}
            onClick={handleCopy}
          >
            {!copy ? <Copy size={14} className="text-white" /> : <Check size={14} className="text-white" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Copiar al portapapeles</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

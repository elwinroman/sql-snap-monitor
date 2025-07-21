import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { copyToClipboard } from '@/utilities'

interface Props {
  text: string
  className?: string
}

export function CopyClipboard({ text, className = '' }: Props) {
  const [copy, setCopy] = useState(false)

  // copia al clipboard
  const handleCopy = () => {
    copyToClipboard({ text })
    setCopy(true)

    // truquito para copiar correctamente, no quitar
    setTimeout(() => {
      setCopy(false)
    }, 1500)
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            className={`mix-colored-background border-border invisible relative grid h-7 w-7 place-content-center rounded-md bg-slate-700 opacity-0 shadow-md backdrop-blur-md transition-colors duration-300 group-hover:visible group-hover:opacity-100 before:absolute before:-translate-x-2 before:translate-y-7 before:-rotate-12 before:text-sm before:font-bold before:text-rose-500 before:transition-all before:content-['Copiado!'] hover:bg-slate-800 ${copy ? 'before:visible before:opacity-100' : 'before:invisible before:opacity-0'} ${className}`}
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

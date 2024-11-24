import { ShieldAlert, ShieldEllipsis } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'

export function PermissionRol() {
  const hasRoles = useEditorStore((state) => state.hasRoles)
  const updateRoles = useEditorStore((state) => state.updateRoles)
  const SQLDefinitionObject = useSQLDefinitionStore((state) => state.SQLDefinitionObject)

  const { permission } = SQLDefinitionObject

  const handleClick = (e) => {
    e.preventDefault()

    // Si no hay permisos no se ejecuta nada
    if (permission.length === 0) return
    updateRoles(!hasRoles)
  }

  let text = ''

  permission.length === 0 ? (text = 'No existe roles asignados') : (text = hasRoles ? 'Ocultar permisos y roles' : 'Ver permisos y roles')

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {permission.length === 0 ? (
            <button className="h-7 rounded-sm px-2">
              <i className="text-red-400">
                <ShieldAlert size={14} />
              </i>
            </button>
          ) : (
            <button
              className={`group rounded-sm px-1.5 py-1.5 hover:bg-popover ${hasRoles ? 'bg-popover' : 'bg-transparent'}`}
              onClick={handleClick}
            >
              <i className="text-white group-hover:text-zinc-400">
                <ShieldEllipsis size={14} />
              </i>
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="max-w-56">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

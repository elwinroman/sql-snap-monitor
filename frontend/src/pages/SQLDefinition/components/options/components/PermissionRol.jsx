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

  permission.length === 0
    ? (text = 'El objeto no tiene permisos explícitos asignados a roles específicos ⚠️')
    : (text = hasRoles ? 'Ocultar permisos y roles' : 'Ver permisos y roles')

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          {permission.length === 0 ? (
            <button className={`rounded-sm p-1.5`}>
              <i className="text-red-400">
                <ShieldAlert size={16} />
              </i>
            </button>
          ) : (
            <button className={`rounded-sm p-1.5 hover:bg-black ${hasRoles ? 'bg-black' : 'bg-transparent'}`} onClick={handleClick}>
              <i className="text-white">
                <ShieldEllipsis size={16} />
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

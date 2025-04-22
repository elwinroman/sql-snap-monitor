import { Calendar, Clock, SquareDot, SquareMenu, User } from 'lucide-react'

export function Metadata({ object }) {
  return (
    <>
      {/* Detalles */}
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center space-x-2 text-sm">
          <SquareDot className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Tipo:</span>
          <span className="text-amber-500 dark:text-amber-400">{object.type}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <SquareMenu className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Descripción del tipo:</span>
          <span>{object.typeDesc}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Creado:</span>
          <span>{object.createDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <User className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Creado por:</span>
          <span>Admin</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Última modificación:</span>
          <span>{object.modifyDate}</span>
        </div>
      </div>
    </>
  )
}

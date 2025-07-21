import { Bolt } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui'

export function Configuration() {
  return (
    <li>
      <Sheet>
        <SheetTrigger className="text-secondary hover:bg-background hover:text-primary grid h-9 place-content-center rounded-sm px-3 transition-colors">
          <i>
            <Bolt size={16} />
          </i>
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Historial de búsqueda</SheetTitle>
            <SheetDescription className="text-red-500">Componente en construcción...</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </li>
  )
}

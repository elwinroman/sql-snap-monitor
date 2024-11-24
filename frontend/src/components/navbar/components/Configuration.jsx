import { Bolt } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function Configuration() {
  return (
    <li>
      <Sheet>
        <SheetTrigger className="grid h-9 place-content-center rounded-sm px-3 text-secondary transition-colors hover:bg-background hover:text-primary">
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

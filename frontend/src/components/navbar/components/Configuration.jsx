import { Bolt } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function Configuration() {
  return (
    <li>
      <Sheet>
        <SheetTrigger className="grid px-3 transition-colors rounded-sm h-9 place-content-center text-secondary hover:bg-background hover:text-primary">
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

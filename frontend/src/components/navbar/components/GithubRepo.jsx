import { Github } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function GithubRepo() {
  const handleClick = (e) => {
    e.preventDefault()
    window.open('https://github.com/elwinroman/quality-tools')
  }

  return (
    <li>
      <Sheet>
        <SheetTrigger
          className="grid px-3 transition-colors rounded-md hover:bg-action-over h-9 place-content-center text-secondary hover:text-primary"
          onClick={handleClick}
        >
          <i>
            <Github size={16} />
          </i>
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Customización</SheetTitle>
            <SheetDescription>Customización theme.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </li>
  )
}

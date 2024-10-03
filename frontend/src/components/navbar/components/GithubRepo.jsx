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
          className="grid h-9 place-content-center rounded-md px-3 hover:bg-zinc-200 hover:text-accent-foreground dark:hover:bg-zinc-700"
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
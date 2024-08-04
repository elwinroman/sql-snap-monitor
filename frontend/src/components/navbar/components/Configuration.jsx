import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Settings as SettingsIcon } from '@/icons/settings'

export function Configuration() {
  return (
    <li>
      <Sheet>
        <SheetTrigger className="grid h-9 place-content-center rounded-md px-3 hover:bg-zinc-200 hover:text-accent-foreground dark:hover:bg-zinc-700">
          <i>
            <SettingsIcon width={16} height={16} />
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

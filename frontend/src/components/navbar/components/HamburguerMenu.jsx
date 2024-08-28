import { Button } from '@/components/ui/button'
import { MenuDeep as MenuDeepIcon } from '@/icons/menu-deep'

export function HamburguerMenu() {
  return (
    <Button variant="ghost" size="sm" className="block sm:hidden">
      <i>
        <MenuDeepIcon width={20} height={20} />
      </i>
    </Button>
  )
}

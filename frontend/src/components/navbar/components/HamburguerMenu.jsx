import { Button } from '@/components/ui/button'
import { MenuDeep as MenuDeepIcon } from '@/icons/menu-deep'

export function HamburguerMenu() {
  return (
    <Button variant="ghost" size="sm">
      <i>
        <MenuDeepIcon width={20} height={20} />
      </i>
    </Button>
  )
}

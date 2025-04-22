import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAligmentStore } from '@/stores'

import { SELECT_ACTION, VIEW_MODE } from '../../../constants/select-actions'

export function ViewModeRadio() {
  const action = useAligmentStore((state) => state.action)
  const viewMode = useAligmentStore((state) => state.viewMode)
  const updateViewMode = useAligmentStore((state) => state.updateViewMode)

  const handleChange = (value) => {
    updateViewMode({ viewMode: value })
  }

  if (action !== SELECT_ACTION.objeto) return

  const typeViews = [
    {
      id: 1,
      name: 'OBJETO + ROLES',
      value: VIEW_MODE.objeto_mas_roles,
    },
    {
      id: 2,
      name: 'SOLO OBJETO',
      value: VIEW_MODE.solo_objeto,
    },
    {
      id: 3,
      name: 'SOLO ROLES',
      value: VIEW_MODE.solo_roles,
    },
  ]

  return (
    <div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold">Vista</span>
        <Select value={viewMode} onValueChange={(value) => handleChange(value)}>
          <SelectTrigger className="h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {typeViews.map((view) => (
                <SelectItem key={view.id} value={view.value} className="text-primary">
                  {view.name.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}

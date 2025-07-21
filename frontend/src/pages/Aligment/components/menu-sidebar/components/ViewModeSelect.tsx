import { useAligmentStore } from '@aligment/zustand/aligment.store'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { TypeViewsList } from '@/constants'
import { ViewMode } from '@/models/sysobject'

export function ViewModeSelect() {
  const viewMode = useAligmentStore((state) => state.viewMode)
  const updateViewMode = useAligmentStore((state) => state.updateViewMode)

  const handleChange = (value: ViewMode) => updateViewMode(value)

  return (
    <div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Vista</span>
        <Select value={viewMode} onValueChange={(value) => handleChange(value as ViewMode)}>
          <SelectTrigger className="h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TypeViewsList.map((view) => (
                <SelectItem key={view.id} value={view.id} className="text-primary">
                  {view.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}

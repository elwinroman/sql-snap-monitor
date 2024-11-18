import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAligmentStore } from '@/stores'

import { SELECT_ACTION, VIEW_MODE } from '../../../constants/select-actions'

export function ViewModeRadio() {
  const action = useAligmentStore((state) => state.action)
  const viewMode = useAligmentStore((state) => state.viewMode)
  const updateViewMode = useAligmentStore((state) => state.updateViewMode)

  const handleChange = (value) => {
    updateViewMode({ viewMode: value })
  }

  return (
    <RadioGroup value={viewMode} onValueChange={handleChange} disabled={action !== SELECT_ACTION.objeto}>
      <div className="flex items-center space-x-2">
        <label className="flex items-center gap-2">
          <RadioGroupItem value={VIEW_MODE.objeto_mas_roles} />
          <span className="text-sm text-zinc-200">Mostrar OBJETO + ROLES</span>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <label className="flex items-center gap-2">
          <RadioGroupItem value={VIEW_MODE.solo_objeto} />
          <span className="text-sm text-zinc-200">Mostrar SOLO OBJETO</span>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <label className="flex items-center gap-2">
          <RadioGroupItem value={VIEW_MODE.solo_roles} />
          <span className="text-sm text-zinc-200">Mostrar SOLO ROLES</span>
        </label>
      </div>
    </RadioGroup>
  )
}

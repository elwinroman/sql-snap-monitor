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

  if (action !== SELECT_ACTION.objeto) return

  return (
    <div className="flex flex-col gap-1.5 rounded-sm border border-dashed border-gray-500/30 bg-card p-3">
      <h3 className="text-xs font-semibold text-secondary">SELECCIONA COMO QUIERES VER:</h3>
      <RadioGroup value={viewMode} onValueChange={handleChange} disabled={action !== SELECT_ACTION.objeto}>
        <div className="flex items-center space-x-2">
          <label className="flex items-center gap-2">
            <RadioGroupItem value={VIEW_MODE.objeto_mas_roles} />
            <span className="text-[12px] text-secondary">OBJETO + ROLES</span>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center gap-2">
            <RadioGroupItem value={VIEW_MODE.solo_objeto} />
            <span className="text-[12px] text-secondary">SOLO OBJETO</span>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center gap-2">
            <RadioGroupItem value={VIEW_MODE.solo_roles} />
            <span className="text-[12px] text-secondary">SOLO ROLES</span>
          </label>
        </div>
      </RadioGroup>
    </div>
  )
}

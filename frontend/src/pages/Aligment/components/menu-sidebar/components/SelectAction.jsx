import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAligmentStore } from '@/stores'

import { SELECT_ACTION } from '../../../constants/select-actions'

const actions = [
  {
    id: 1,
    name: 'Recuperar objeto',
    value: SELECT_ACTION.objeto,
  },
  {
    id: 2,
    name: 'Recuperar campos (atributos)',
    value: SELECT_ACTION.campos,
  },
]

export function SelectAction() {
  const action = useAligmentStore((state) => state.action)
  const updateAction = useAligmentStore((state) => state.updateAction)

  const handleChange = (value) => {
    updateAction({ action: value })
  }

  return (
    <div>
      <label className="flex flex-col gap-2">
        <span className="text-sm">Acción</span>
        <Select value={action} onValueChange={(value) => handleChange(value)}>
          <SelectTrigger className="h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {actions.map((action) => (
                <SelectItem key={action.id} value={action.value} className="text-zinc-300">
                  {action.name.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}

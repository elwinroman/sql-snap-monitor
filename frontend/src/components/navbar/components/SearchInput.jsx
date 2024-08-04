import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Search as SearchIcon } from '@/icons/search'
import { useDefinition } from '@/hooks/useDefinition'
import { useObjectStore } from '@/stores/object.store'

export function SearchInput() {
  const { getDefinitionObject } = useDefinition()
  const object = useObjectStore((state) => state.object)

  const handleKeyup = async (e) => {
    e.preventDefault()
    const value = e.target.value.trim()
    console.log('value', value, 'object.name', object.name)
    if (value === '') return
    if (object.name && value.toLowerCase() === object.name.toLowerCase()) return

    if (e.key === 'Enter') {
      await getDefinitionObject({ name: value })
    }
  }

  return (
    <li>
      <InputWithIcon
        size="default"
        startIcon={<SearchIcon width={20} height={20} />}
        placeholder="Search"
        onKeyUp={handleKeyup}
      />
    </li>
  )
}

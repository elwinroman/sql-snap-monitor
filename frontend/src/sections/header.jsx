import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Search as SearchIcon } from '@/icons/search'

export function Header() {
  const handleKeyup = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()

    if (value === '') return

    if (e.key === 'Enter') {
      console.log(value)
      // Actualizar el estado del stringCode para renderizar el codigo
    }
  }
  return (
    <header className="flex w-full flex-[0_0_var(--navbar-height)] flex-row items-center gap-8">
      <div className="grow">1</div>
      <div>
        <InputWithIcon
          startIcon={<SearchIcon />}
          placeholder="Search"
          onKeyUp={handleKeyup}
        />
      </div>
      <div>aroman</div>
      <div>icons</div>
    </header>
  )
}

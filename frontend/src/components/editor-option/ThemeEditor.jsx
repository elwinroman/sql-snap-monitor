import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { THEMES } from '@/constants/themes'
import { useEditorStore } from '@/stores'

export function ThemeEditor() {
  const updateTheme = useEditorStore((state) => state.updateTheme)
  const theme = useEditorStore((state) => state.theme)

  const myThemes = THEMES.sort((a, b) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  })

  const handleChange = (value) => updateTheme(value)

  return (
    <>
      <Select value={theme} onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="h-7 w-[140px] py-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-zinc-400">Editor theme</SelectLabel>
            {myThemes.map((themeItem) => (
              <SelectItem key={themeItem.tag} value={themeItem.tag}>
                {themeItem.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

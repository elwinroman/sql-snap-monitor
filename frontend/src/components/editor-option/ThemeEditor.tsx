import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui'
import { MonacoThemes } from '@/constants'
import { IMonacoTheme } from '@/models'
import { useEditorOptionsStore } from '@/zustand'

export function ThemeEditor() {
  const updateTheme = useEditorOptionsStore((state) => state.updateTheme)
  const theme = useEditorOptionsStore((state) => state.theme)

  const myThemes = Object.entries(MonacoThemes).sort(([, a], [, b]) => a.name.localeCompare(b.name))

  const handleChange = (value: IMonacoTheme) => updateTheme(value)

  return (
    <Select value={theme} onValueChange={(value) => handleChange(value as IMonacoTheme)}>
      <SelectTrigger className="h-7 w-[140px] py-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-muted">Editor theme</SelectLabel>
          {myThemes.map((theme) => (
            <SelectItem key={theme[0]} value={theme[0]}>
              {theme[1].name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

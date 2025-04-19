import { FontSize } from '@/components/editor-option/FontSize'
import { IndentationWhitespace } from '@/components/editor-option/IndentationWhitespace'
import { ThemeEditor } from '@/components/editor-option/ThemeEditor'

import { MaxMin } from './MaxMin'
import { PermissionRol } from './PermissionRol'

export function EditorOptions() {
  return (
    <div className="transition duration-200">
      <div className="flex flex-nowrap items-center gap-x-3 gap-y-2 sm:justify-end sm:gap-x-5 sm:gap-y-4">
        <div className="flex flex-nowrap items-center gap-2">
          <ThemeEditor />
          <FontSize />
          <PermissionRol />
          <IndentationWhitespace />
        </div>

        <div className="flex items-center gap-1">
          <MaxMin />
        </div>
      </div>
    </div>
  )
}

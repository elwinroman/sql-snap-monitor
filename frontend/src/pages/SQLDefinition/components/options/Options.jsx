import { CopyClipboard } from './components/CopyClipboard'
import { DiffCompare } from './components/DiffCompare'
import { FontSize } from './components/FontSize'
import { IndentationWhitespace } from './components/IndentationWhitespace'
import { MaxMin } from './components/MaxMin'
import { PermissionRol } from './components/PermissionRol'
import { SideBySide } from './components/SideBySide'
import { ThemeEditor } from './components/ThemeEditor'

export function Options() {
  return (
    <div className="transition duration-200">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:justify-end sm:gap-x-5 sm:gap-y-4">
        <div className="flex items-center">
          <CopyClipboard />
        </div>

        <div className="flex flex-nowrap items-center gap-1">
          <ThemeEditor />
          <FontSize />
          <PermissionRol />
          <IndentationWhitespace />
        </div>

        <div className="flex flex-nowrap items-center gap-1">
          <SideBySide />
          <DiffCompare />
        </div>

        <div className="flex items-center gap-1">
          <MaxMin />
        </div>
      </div>
    </div>
  )
}

import { CopyClipboard } from './components/CopyClipboard'
import { DiffCompare } from './components/DiffCompare'
import { FontSize } from './components/FontSize'
import { IndentationWhitespace } from './components/IndentationWhitespace'
import { MaxMin } from './components/MaxMin'
import { PermissionRol } from './components/PermissionRol'
import { SideBySide } from './components/SideBySide'

export function Options() {
  return (
    <div className="m transition duration-200">
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <CopyClipboard />
        </div>

        <div className="flex items-center gap-1">
          <FontSize />
          <PermissionRol />
          <IndentationWhitespace />
        </div>

        <div className="flex items-center gap-1">
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

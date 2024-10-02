import { CopyClipboard } from './components/CopyClipboard'
import { DiffCompare } from './components/DiffCompare'
import { IndentationWhitespace } from './components/IndentationWhitespace'
import { MaxMin } from './components/MaxMin'
import { PermissionRol } from './components/PermissionRol'
import { SideBySide } from './components/SideBySide'

export function Options() {
  return (
    <div className="m transition duration-200">
      <div className="flex items-center gap-4">
        <CopyClipboard />
        <div className="flex gap-0.5">
          <SideBySide />
          <PermissionRol />
          <IndentationWhitespace />
          <DiffCompare />
        </div>
        <MaxMin />
      </div>
    </div>
  )
}

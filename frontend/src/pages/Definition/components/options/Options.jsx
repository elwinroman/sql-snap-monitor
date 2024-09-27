import { CopyClipboard } from './components/CopyClipboard'
import { MaxMin } from './components/MaxMin'
import { DiffCompare } from './components/DiffCompare'
import { SideBySide } from './components/SideBySide'
import { IndentationWhitespace } from './components/IndentationWhitespace'

export function Options() {
  return (
    <div className="m transition duration-200">
      <div className="flex items-center gap-4">
        <CopyClipboard />
        <div className="flex gap-0.5">
          <SideBySide />
          <IndentationWhitespace />
          <DiffCompare />
        </div>
        <MaxMin />
      </div>
    </div>
  )
}

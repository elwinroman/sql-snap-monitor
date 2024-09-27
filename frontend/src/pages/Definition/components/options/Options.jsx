import { CopyClipboard } from './components/CopyClipboard'
import { MaxMin } from './components/MaxMin'

export function Options() {
  return (
    <div className="m transition duration-200">
      <div className="flex items-center gap-4">
        <CopyClipboard />
        <MaxMin />
      </div>
    </div>
  )
}

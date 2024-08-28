import { CopyClipboard } from './components/CopyClipboard'
import { MaxMin } from './components/MaxMin'

export function Options({ maximize, toggleMaximize }) {
  return (
    <div className="rounded-full border border-zinc-400/30 bg-slate-900/60 px-2 py-2 backdrop-blur-sm transition duration-200">
      <div className="flex items-center gap-2">
        <MaxMin maximize={maximize} toggleMaximize={toggleMaximize} />
        <CopyClipboard />
      </div>
    </div>
  )
}

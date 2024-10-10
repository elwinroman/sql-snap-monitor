import { version } from '~/package.json'

export function Footer() {
  return (
    <footer className="flex h-20 shrink-0 flex-col items-center justify-center gap-2">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        <span>Developed by Elwin Roman 🚀</span>
        <span className="text-xs text-amber-400"> v.{version} (beta)</span>
      </p>
    </footer>
  )
}

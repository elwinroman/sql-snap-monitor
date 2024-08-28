import { version } from '~/package.json'

export function Footer() {
  return (
    <footer className="flex h-20 shrink-0 flex-col items-center justify-center gap-2">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        <span>Hecho con </span>
        <span>❤️</span>
        <span> por Romeltek</span>
      </p>
      <span className="font-[Menlo] text-xs text-slate-300">
        v.{version} (beta)
      </span>
    </footer>
  )
}

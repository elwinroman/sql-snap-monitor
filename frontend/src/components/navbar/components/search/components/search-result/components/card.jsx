export function Card({ children, title, className }) {
  return (
    <article className={`flex h-auto w-full flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-sm py-2 ${className}`}>
      <span className="px-4 text-[0.84rem] font-medium text-amber-400">{title}</span>
      <ul className="flex flex-col">{children}</ul>
    </article>
  )
}

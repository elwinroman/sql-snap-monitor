export function Card({ children, title, className }) {
  return (
    <article className={`flex h-auto w-full flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-sm py-2 ${className}`}>
      <span className="text-secondary px-4 text-sm font-medium">{title}</span>
      <ul className="flex flex-col">{children}</ul>
    </article>
  )
}

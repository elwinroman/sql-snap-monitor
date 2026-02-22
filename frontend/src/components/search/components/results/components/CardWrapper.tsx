interface Props {
  children: React.ReactNode
  title: string
  className?: string
}

export function CardWrapper({ children, title, className = '' }: Props) {
  return (
    <article className={`flex h-auto w-full flex-col gap-1 rounded-sm py-2 ${className}`}>
      <span className="text-secondary px-4 text-sm font-medium">{title}</span>
      <ul className="flex flex-col">{children}</ul>
    </article>
  )
}

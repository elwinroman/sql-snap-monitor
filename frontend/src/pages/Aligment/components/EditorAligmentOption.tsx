import { FontSize, IndentationWhitespace, ThemeEditor } from '@/components/editor-option'

interface Props {
  className?: string
}

export function EditorAligmentOption({ className = '' }: Props) {
  return (
    <section className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:justify-end sm:gap-x-5 sm:gap-y-4">
        <div className="flex flex-nowrap items-center gap-2">
          <ThemeEditor />
          <FontSize />
          <IndentationWhitespace />
        </div>
      </div>
    </section>
  )
}

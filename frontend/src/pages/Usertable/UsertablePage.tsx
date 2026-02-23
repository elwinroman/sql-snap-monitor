import { Navbar } from '@/components/navbar/Navbar'

import { UsertableContent } from './components/UsertableContent'

export function UsertablePage() {
  return (
    <section className="bg-background flex h-full w-full flex-col">
      <Navbar />

      <main className="relative h-full w-full overflow-hidden px-2 pb-2">
        <section className="bg-background-paperchanel border-border h-full w-full overflow-hidden rounded-sm border">
          <UsertableContent />
        </section>
      </main>
    </section>
  )
}

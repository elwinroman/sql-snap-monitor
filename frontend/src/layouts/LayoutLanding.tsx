import type { ReactNode } from 'react'

import { Navbar } from '@/components/navbar/Navbar'

interface LayoutLandingProps {
  children: ReactNode
}

export function LayoutLanding({ children }: LayoutLandingProps) {
  return (
    <section className="bg-baselayer h-full w-full overflow-auto">
      <Navbar />
      <div className="h-full w-full">
        <div className="h-full w-full">{children}</div>

        <footer className="">
          <p className="text-secondary flex flex-col items-center gap-1 text-sm">
            <span>
              © 2025 <strong>Departamento de Aseguramiento de Calidad</strong>
            </span>
          </p>
        </footer>
      </div>
    </section>
  )
}

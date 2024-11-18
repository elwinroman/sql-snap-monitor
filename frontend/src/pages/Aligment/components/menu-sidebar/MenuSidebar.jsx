import { Checkbox } from '@/components/ui/checkbox'

import { ButtonGroup, SearchAligment, SelectAction, ViewModeRadio } from './components'

export function MenuSidebar({ className }) {
  return (
    <nav className={className}>
      <header>regresar</header>

      <div className="flex-grow px-4 py-4 md:px-6">
        <div className="flex flex-col gap-6">
          {/* Texto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-zinc-200">CONSULTA DE OBJETOS PARA ALINEACIÓN</h4>

            <span className="text-sm text-zinc-200">
              Recupera los objetos alineados a <strong>pre-producción</strong> y dí adios a observaciones por devío de ambientes
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Action */}
            <SelectAction />

            {/* Radio options */}
            <ViewModeRadio />
          </div>

          {/* Input */}
          <SearchAligment />

          {/* Términos y condiciones */}
          <div>
            <label className="flex gap-2">
              <Checkbox disabled={true} checked={true} className="mt-1" />
              <span className="text-sm text-zinc-300">Al realizar la consulta acepto que mis datos sean recopilados.</span>
            </label>
          </div>

          {/* Buttons */}
          <ButtonGroup />
        </div>
      </div>

      <footer className="">login</footer>
    </nav>
  )
}

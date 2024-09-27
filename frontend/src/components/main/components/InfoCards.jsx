import { BreadcrumCard } from './BreadcrumCard'
import { ObjectInfoCard } from './ObjectInfoCard'

export function InfoCards({ object }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Información general del objecto */}
      <BreadcrumCard />

      {/* Información del objeto */}
      <ObjectInfoCard object={object} />
    </div>
  )
}

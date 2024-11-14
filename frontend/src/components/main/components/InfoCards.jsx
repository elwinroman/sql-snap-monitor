import { BreadcrumCard } from './BreadcrumCard'
import { ObjectInfoCard } from './ObjectInfoCard'

export function InfoCards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Información general del objecto */}
      <BreadcrumCard />

      {/* Información del objeto */}
      <ObjectInfoCard />
    </div>
  )
}

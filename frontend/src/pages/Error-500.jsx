import { Button } from '@/components/ui/button'
import { Error500 as Error500Icon } from '@/icons'

export function Error500() {
  const handleHome = () => {
    window.location.reload()
  }

  return (
    <section className="grid h-screen w-screen place-content-center">
      <article className="w-full max-w-[448px] flex flex-col text-center items-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-['Barlow'] text-3xl">Internal server error 500</h3>
          <p className="text-secondary">Se ha producido un error, vuelva a intentarlo más tarde.</p>
        </div>

        <Error500Icon />

        <div>
          <Button onClick={handleHome}>Refrescar</Button>
        </div>
      </article>
    </section>
  )
}

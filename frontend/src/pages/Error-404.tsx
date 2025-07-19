import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Error404 as Error404Icon } from '@/icons'

export function Error404() {
  const navigate = useNavigate()

  const handleHome = () => {
    navigate('/')
  }

  return (
    <section className="grid h-screen w-full place-content-center">
      <article className="flex w-full max-w-[448px] flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-['Barlow'] text-3xl">Lo sentimos, ¡página no encontrada!</h3>
          <p className="text-secondary">No hemos podido encontrar la página que buscas. ¿Quizás has escrito mal la URL?</p>
        </div>

        <Error404Icon />

        <div>
          <Button onClick={handleHome}>Home</Button>
        </div>
      </article>
    </section>
  )
}

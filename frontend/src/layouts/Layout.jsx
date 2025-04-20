import { ChevronUp } from 'lucide-react'
import { useRef, useState } from 'react'

import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/sections/footer'

export default function Layout({ children }) {
  const pageRef = useRef(null)
  const scrollPos = useRef(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  // Cuando se hace click en el botón scrollToTop, sube arriba del todo
  const handleScrollToTop = () => {
    pageRef.current.scrollTop = 0
  }

  // Obtener siempre la posición del scroll en Y
  const handleGetScrollPositionY = (e) => {
    const minScrollPosition = 100
    const scrollPosition = e.currentTarget.scrollTop
    scrollPos.current = scrollPosition

    // mostrar el btn cuando sea mayor minScrollPosition
    if (scrollPosition > minScrollPosition) setShowScrollBtn(true)
    else setShowScrollBtn(false)
  }

  return (
    <>
      <div ref={pageRef} className="App bg-baselayer flex w-full overflow-y-auto scroll-smooth" onScroll={handleGetScrollPositionY}>
        {/* <Sidebar /> */}
        <main className="mx-auto flex h-screen w-full flex-col">
          <div className="relative mb-6 bg-white dark:bg-inherit">
            <Navbar className="px-3 sm:px-4 md:px-5 lg:px-6" />
          </div>

          {/* Main content */}
          <Main className="px-3 sm:px-4 md:px-5 lg:px-6">{children}</Main>

          {/* Pie de pagina */}
          <Footer />
        </main>
      </div>

      {/* Scroll to Top */}
      <button
        className={`bg-palette-primary-main hover:bg-palette-primary-dark absolute right-10 bottom-10 z-10 grid h-9 w-9 place-content-center rounded-full text-white transition-all ${!showScrollBtn ? 'invisible opacity-0' : ''}`}
        onClick={handleScrollToTop}
      >
        <ChevronUp size={20} />
      </button>
    </>
  )
}

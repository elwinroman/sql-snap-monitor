import { ChevronUp } from 'lucide-react'
import { useRef, useState } from 'react'

import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { NavbarMenu } from '@/components/navbar-menu/NavbarMenu'
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
      <div ref={pageRef} className="flex w-full overflow-y-auto App bg-baselayer scroll-smooth" onScroll={handleGetScrollPositionY}>
        {/* <Sidebar /> */}
        <main className="flex flex-col w-full h-screen mx-auto">
          <div className="relative mb-6">
            <Navbar className="px-4 sm:px-5 md:px-6 lg:px-7" />
            <NavbarMenu className="px-4 sm:px-5 md:px-6 lg:px-7" />
          </div>
          <Main className="px-4 sm:px-5 md:px-6 lg:px-7">{children}</Main>
          <Footer />
        </main>
      </div>

      {/* Scroll to Top */}
      <button
        className={`absolute z-50 grid text-white transition-all rounded-full w-9 h-9 right-10 bg-palette-primary-main bottom-10 place-content-center hover:bg-palette-primary-dark ${!showScrollBtn ? 'invisible opacity-0' : ''}`}
        onClick={handleScrollToTop}
      >
        <ChevronUp size={20} />
      </button>
    </>
  )
}

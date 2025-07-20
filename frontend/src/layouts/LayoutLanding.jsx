import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/sections/footer'

export function LayoutLanding({ children }) {
  return (
    <div className="App bg-baselayer flex w-full overflow-y-auto">
      {/* <Sidebar /> */}
      <main className="mx-auto flex h-screen w-full flex-col">
        <div className="relative">
          <Navbar className="px-4 sm:px-5 md:px-6 lg:px-7" />
        </div>
        <Main className="">{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

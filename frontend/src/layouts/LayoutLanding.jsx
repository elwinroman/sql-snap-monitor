import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/sections/footer'

export default function LayoutLanding({ children }) {
  return (
    <div className="flex w-full overflow-y-auto App bg-baselayer">
      {/* <Sidebar /> */}
      <main className="flex flex-col w-full h-screen mx-auto">
        <div className="relative">
          <Navbar className="px-4 sm:px-5 md:px-6 lg:px-7" />
        </div>
        <Main className="">{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

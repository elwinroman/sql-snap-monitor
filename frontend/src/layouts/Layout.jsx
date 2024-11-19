import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { NavbarMenu } from '@/components/navbar-menu/NavbarMenu'
import { Footer } from '@/sections/footer'
// import { Sidebar } from '@/components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App bg-baselayer flex w-full overflow-y-auto">
      {/* <Sidebar /> */}
      <main className="bg-baselayer mx-auto flex h-screen w-full flex-col px-4 sm:px-5 md:px-6 lg:px-7">
        <div className="relative mb-6">
          <Navbar />
          <NavbarMenu />
        </div>
        <Main>{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

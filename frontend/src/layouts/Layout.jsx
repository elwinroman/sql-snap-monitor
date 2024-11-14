import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { NavbarMenu } from '@/components/navbar-menu/NavbarMenu'
import { Footer } from '@/sections/footer'
// import { Sidebar } from '@/components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App flex w-full overflow-y-auto bg-owmain">
      {/* <Sidebar /> */}
      <main className="mx-auto flex h-screen w-full max-w-screen-2xl flex-col bg-owmain px-4 sm:px-5 md:px-6 lg:px-7">
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

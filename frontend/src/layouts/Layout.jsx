import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { NavbarMenu } from '@/components/navbar-menu/NavbarMenu'
import { Footer } from '@/sections/footer'
// import { Sidebar } from '@/components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App flex w-full overflow-y-auto bg-baselayer">
      {/* <Sidebar /> */}
      <main className="mx-auto flex h-screen w-full flex-col bg-baselayer">
        <div className="relative mb-6 bg-card shadow-md dark:bg-transparent">
          <Navbar className="px-4 sm:px-5 md:px-6 lg:px-7" />
          <NavbarMenu className="px-4 sm:px-5 md:px-6 lg:px-7" />
        </div>
        <Main className="px-4 sm:px-5 md:px-6 lg:px-7">{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

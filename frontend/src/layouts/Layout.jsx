import { Footer } from '@/sections/footer'
import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-owmain px-4">
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

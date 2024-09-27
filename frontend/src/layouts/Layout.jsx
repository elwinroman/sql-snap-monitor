import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/sections/footer'
// import { Sidebar } from '@/components/sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App flex w-full overflow-y-auto bg-owmain">
      {/* <Sidebar /> */}
      <main className="relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col bg-owmain">
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </main>
    </div>
  )
}

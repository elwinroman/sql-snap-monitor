import './App.css'
import { Footer } from '@/sections/footer'
import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/sections/sidebar.jsx'

function App() {
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="bg-owmain relative flex h-screen w-full flex-col overflow-y-auto px-8">
        <Navbar />
        <Main />
        <Footer />
      </main>
    </div>
  )
}

export default App

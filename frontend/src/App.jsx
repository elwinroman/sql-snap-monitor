import './App.css'
import { Footer } from '@/sections/footer'
import { Main } from '@/components/main/Main'
import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-owmain px-4">
        <Navbar />
        <Main />
        <Footer />
      </main>
    </div>
  )
}

export default App

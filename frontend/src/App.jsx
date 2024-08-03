import './App.css'
import { Footer } from '@/sections/footer'
import { Main } from './sections/main'
import { Navbar } from '@/sections/navbar.jsx'
import { Sidebar } from '@/sections/sidebar.jsx'

function App() {
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-ow px-8">
        <Navbar />
        <Main />
        <Footer />
      </main>
    </div>
  )
}

export default App

import './App.css'
import { Navbar } from '@/sections/navbar.jsx'
import { Sidebar } from '@/sections/sidebar.jsx'
import { Main } from './sections/main'

function App() {
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="relative flex h-screen w-full flex-col overflow-y-auto bg-ow px-8">
        <Navbar />
        <Main />
        <footer className="flex-[0_0_200px] bg-slate-900 text-slate-50">
          Hecho por Aroman
        </footer>
      </main>
    </div>
  )
}

export default App

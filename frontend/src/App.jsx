import './App.css'
// import { Button } from '@/components/ui/button.jsx'
import { Header } from '@/sections/header.jsx'
import { Sidebar } from '@/sections/sidebar.jsx'
import { MainContent } from '@/sections/main-content.jsx'

function App() {
  return (
    <div className="App flex w-full">
      <Sidebar />
      <main className="bg-ow relative flex h-screen w-full flex-col overflow-y-auto">
        <Header />
        <MainContent />
        <footer className="flex-[0_0_200px] bg-slate-900 text-slate-50">
          Hecho por Aroman
        </footer>
      </main>
    </div>
  )
}

export default App

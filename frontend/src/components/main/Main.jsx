import { Definition, Description } from '@/pages/index'
import { Route, Routes } from 'react-router-dom'

function Error() {
  return <div>Error 404</div>
}

function Home() {
  return <div>Home</div>
}

export function Main() {
  return (
    <section className="w-full flex-[1_0_auto] px-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/definition" element={<Definition />} />
        <Route path="/description" element={<Description />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </section>
  )
}

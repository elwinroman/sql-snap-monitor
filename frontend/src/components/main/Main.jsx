// import { Definition, Description } from '@/pages/index'
// import { Route, Routes } from 'react-router-dom'
// import { InfoCards } from './components/InfoCards'

// function Error() {
//   return <div>Error 404</div>
// }

// function Home() {
//   return <div>Home</div>
// }

export function Main({ children }) {
  return (
    <section className="w-full flex-[1_0_auto] px-4">
      {children}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/definition"
          element={
            <div className="flex flex-col gap-4">
              <InfoCards />
              <Definition />
            </div>
          }
        />
        <Route
          path="/description"
          element={
            <div className="flex flex-col gap-4">
              <InfoCards />
              <Description />
            </div>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes> */}
    </section>
  )
}

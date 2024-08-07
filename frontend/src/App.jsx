import './App.css'
import { Definition, Description, LoginPage } from '@/pages'
import { InfoCards } from '@/components/main/components/InfoCards'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '@/layouts/Layout'

function Error() {
  return <div>Error 404</div>
}

function Home() {
  return <div>Home</div>
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/definition"
          element={
            <Layout>
              <InfoCards />
              <Definition />
            </Layout>
          }
        />
        <Route
          path="/description"
          element={
            <Layout>
              <InfoCards />
              <Description />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App

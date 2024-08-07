import './App.css'
import { DefinitionPage, DescriptionPage, LoginPage } from '@/pages'
import { InfoCards } from '@/components/main/components/InfoCards'
import { ProtectedLayout } from '@/components/ProtectedLayout'
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
            <ProtectedLayout>
              <Layout>
                <Home />
              </Layout>
            </ProtectedLayout>
          }
        />
        <Route
          path="/definition"
          element={
            <ProtectedLayout>
              <Layout>
                <InfoCards />
                <DefinitionPage />
              </Layout>
            </ProtectedLayout>
          }
        />
        <Route
          path="/description"
          element={
            <ProtectedLayout>
              <Layout>
                <InfoCards />
                <DescriptionPage />
              </Layout>
            </ProtectedLayout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App

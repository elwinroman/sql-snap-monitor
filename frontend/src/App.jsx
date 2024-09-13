import './App.css'
import '@fontsource-variable/open-sans' // Supports weights 300-800
import { DefinitionPage, DescriptionPage, LoginPage } from '@/pages'
import { InfoCards } from '@/components/main/components/InfoCards'
import { ProtectedLayout } from '@/components/ProtectedLayout'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useObjectStore } from '@/stores/object.store'
import Layout from '@/layouts/Layout'

function Error() {
  return <div>Error 404</div>
}

function Home() {
  return <div>Home</div>
}

function App() {
  const SQLDefinitionObject = useObjectStore((state) => state.SQLDefinitionObject)
  const userTableObject = useObjectStore((state) => state.userTableObject)

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
                <InfoCards object={SQLDefinitionObject} />
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
                <InfoCards object={userTableObject} />
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

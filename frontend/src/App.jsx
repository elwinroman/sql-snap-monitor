import './App.css'

import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { InfoCards } from '@/components/main/components/InfoCards'
import { ProtectedLayout } from '@/components/ProtectedLayout'
import Layout from '@/layouts/Layout'
import { HomePage, LoginPage, SQLDefinitionPage, UsertablePage } from '@/pages'
import { useSQLDefinitionStore, useUserTableStore } from '@/stores'

function Error() {
  return <div>Error 404</div>
}

function App() {
  const SQLDefinitionObject = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const userTableObject = useUserTableStore((state) => state.userTableObject)

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
                <HomePage />
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
                <SQLDefinitionPage />
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
                <UsertablePage />
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

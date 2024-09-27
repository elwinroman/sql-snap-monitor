import './App.css'

import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { InfoCards } from '@/components/main/components/InfoCards'
import { ProtectedLayout } from '@/components/ProtectedLayout'
import Layout from '@/layouts/Layout'
import { HomePage, LoginPage, SQLDefinitionPage, UsertablePage } from '@/pages'
import { useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { ROUTES } from './constants/routes'

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
          path={ROUTES.HOME}
          element={
            <ProtectedLayout>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedLayout>
          }
        />
        <Route
          path={ROUTES.SQL_DEFINITION}
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
          path={ROUTES.USERTABLE}
          element={
            <ProtectedLayout>
              <Layout>
                <InfoCards object={userTableObject} />
                <UsertablePage />
              </Layout>
            </ProtectedLayout>
          }
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App

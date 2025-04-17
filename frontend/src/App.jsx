import './App.css'

import { Route, Routes } from 'react-router-dom'

import { ServerDatabaseInfo } from '@/components/main/ServerDatabaseInfo'
import { ProtectedLayout } from '@/components/ProtectedLayout'
import { ROUTES } from '@/constants'
import Layout from '@/layouts/Layout'
import LayoutLanding from '@/layouts/LayoutLanding'
import { AligmentPage, Error404, HomePage, LoginPage, SQLDefinitionPage, UsertablePage } from '@/pages'

function App() {
  return (
    <>
      {/* Página principal */}
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedLayout>
              <LayoutLanding>
                <HomePage />
              </LayoutLanding>
            </ProtectedLayout>
          }
        />

        {/* Página definiciones SQL */}
        <Route
          path={ROUTES.SQL_DEFINITION}
          element={
            <ProtectedLayout>
              <Layout>
                <ServerDatabaseInfo />
                <SQLDefinitionPage />
              </Layout>
            </ProtectedLayout>
          }
        />

        {/* Página Tabla de usuario */}
        <Route
          path={ROUTES.USERTABLE}
          element={
            <ProtectedLayout>
              <Layout>
                <ServerDatabaseInfo />
                <UsertablePage />
              </Layout>
            </ProtectedLayout>
          }
        />

        {/* Login */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Página de aligment */}
        <Route path={ROUTES.ALIGMENT} element={<AligmentPage />} />

        {/* Error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App

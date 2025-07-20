import './App.css'

import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/constants'
// import Layout from '@/layouts/Layout'
// import { ServerDatabaseInfo } from '@/components/main/ServerDatabaseInfo'
import { LayoutLanding, ProtectedLayout } from '@/layouts'
import { LoginPage } from '@/pages'
// import { AligmentPage, Error404, HomePage, IssuesPage, LoginPage, SQLDefinitionPage, UsertablePage } from '@/pages'
import { AligmentPage, Error404, HomePage } from '@/pages'

import { LoginProvider } from './pages/Login/contexts/login.context'

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
        {/* <Route
          path={ROUTES.SQL_DEFINITION}
          element={
            <ProtectedLayout>
              <Layout>
                <ServerDatabaseInfo />
                <SQLDefinitionPage />
              </Layout>
            </ProtectedLayout>
          }
        /> */}

        {/* Página Tabla de usuario */}
        {/* <Route
          path={ROUTES.USERTABLE}
          element={
            <ProtectedLayout>
              <Layout>
                <ServerDatabaseInfo />
                <UsertablePage />
              </Layout>
            </ProtectedLayout>
          }
        /> */}

        {/* Página Tabla de usuario */}
        {/* <Route
          path={ROUTES.ISSUES}
          element={
            <ProtectedLayout>
              <Layout noMargin={true}>
                <IssuesPage />
              </Layout>
            </ProtectedLayout>
          }
        /> */}

        {/* Login */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <LoginProvider>
              <LoginPage />
            </LoginProvider>
          }
        />

        {/* Página de aligment */}
        <Route path={ROUTES.ALIGMENT} element={<AligmentPage />} />

        {/* Error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App

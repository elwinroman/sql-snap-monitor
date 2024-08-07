import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'

export function ProtectedLayout({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) return <Navigate to="/login" />

  return children
}

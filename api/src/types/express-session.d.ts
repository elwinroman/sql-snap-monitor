/* eslint-disable @typescript-eslint/no-unused-vars */
import session from 'express-session'

import { Credentials } from '@/models/schemas'

declare module 'express-session' {
  // Añade aquí las propiedades de sesión que necesites
  interface SessionData {
    credentials: Credentials
    isSessionActive: boolean
    idUsuario: number
  }
}

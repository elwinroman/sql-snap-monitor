import * as Sentry from '@sentry/node'

import { SENTRY_DNS } from '@/config/enviroment'

Sentry.init({
  dsn: SENTRY_DNS,
  integrations: function (integrations) {
    /**
     * Filtra las integraciones que no se necesita
     * GlobalHandlers: Adjunta controladores globales que permiten capturar excepciones no detectadas y rechazos no manejados (se tiene un middleware de manejo de errores por lo que no es necesario esta integración)
     **/
    return integrations.filter(function (integration) {
      return integration.name !== 'GlobalHandlers'
    })
  },
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  // sendDefaultPii: false,
})

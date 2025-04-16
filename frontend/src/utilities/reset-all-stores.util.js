import { useAuthStore, useDiffEditorStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

/**
 * Resetea el estado y limpia el almacenamiento persistente de todos los stores globales.
 *
 * - Llama a `.reset()` en cada store para restaurar su estado por defecto.
 * - Llama a `.persist.clearStorage()` para eliminar los datos persistidos en sessionStorage o localStorage.
 *
 */
export function resetAllStores() {
  useAuthStore.getState().reset()
  useSQLDefinitionStore.getState().reset()
  useUserTableStore.getState().reset()
  useDiffEditorStore.getState().reset()

  useSQLDefinitionStore.persist.clearStorage()
  useUserTableStore.persist.clearStorage()
  useDiffEditorStore.persist.clearStorage()
}

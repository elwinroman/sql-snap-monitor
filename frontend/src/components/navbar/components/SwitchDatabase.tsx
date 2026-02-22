import { ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { listDatabasesAuthenticatedService, switchDatabaseService } from '@/services'
import { useAuthStore, useSysObjectStore } from '@/zustand'

export function SwitchDatabase() {
  const authContext = useAuthStore((state) => state.authContext)
  const updateDatabase = useAuthStore((state) => state.updateDatabase)
  const clearSysObject = useSysObjectStore((state) => state.createSysObject)

  const { callEndpoint: callListDatabases, loading: loadingDatabases } = useFetchAndLoad<string[]>()
  const { callEndpoint: callSwitchDatabase, loading: loadingSwitch } = useFetchAndLoad()

  const [open, setOpen] = useState(false)
  const [databases, setDatabases] = useState<string[]>([])
  const [selectedDb, setSelectedDb] = useState('')

  if (!authContext) return null

  const handleOpen = async (isOpen: boolean) => {
    setOpen(isOpen)

    if (!isOpen) {
      setSelectedDb('')
      setDatabases([])
      return
    }

    try {
      const response = await callListDatabases(listDatabasesAuthenticatedService())
      const filtered = response.data.filter((db) => db !== authContext.database)
      setDatabases(filtered)
    } catch {
      toast.error('No se pudieron cargar las bases de datos.')
      setOpen(false)
    }
  }

  const handleSwitch = async () => {
    if (!selectedDb) return

    try {
      await callSwitchDatabase(switchDatabaseService(selectedDb))
      updateDatabase(selectedDb)
      clearSysObject(null)
      handleOpen(false)
      toast.success(`Base de datos cambiada a '${selectedDb}'.`)
    } catch {
      toast.error(`No tienes permisos para acceder a '${selectedDb}'.`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <button
        onClick={() => handleOpen(true)}
        className="text-secondary hover:text-primary cursor-pointer transition-colors"
        title="Cambiar base de datos"
      >
        <ArrowLeftRight size={13} strokeWidth="2.5px" />
      </button>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Cambiar base de datos</DialogTitle>
          <DialogDescription>
            Base de datos actual: <strong>{authContext.database}</strong>
          </DialogDescription>
        </DialogHeader>

        <Select value={selectedDb} onValueChange={setSelectedDb} disabled={loadingDatabases}>
          <SelectTrigger>
            <SelectValue placeholder={loadingDatabases ? 'Cargando...' : 'Selecciona una base de datos'} />
          </SelectTrigger>
          <SelectContent>
            {databases.map((db) => (
              <SelectItem key={db} value={db}>
                {db}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSwitch} variant={loadingSwitch || !selectedDb ? 'disabled' : 'default'}>
            {loadingSwitch ? 'Cambiando...' : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

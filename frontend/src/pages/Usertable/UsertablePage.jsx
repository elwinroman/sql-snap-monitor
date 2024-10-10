import { Table } from 'lucide-react'

import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LoaderSlack } from '@/components/loader/LoaderSlack'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { useUserTableStore } from '@/stores'

import { TableDescription } from './components'

export function UsertablePage() {
  const userTableObject = useUserTableStore((state) => state.userTableObject)
  const userTableColumnList = useUserTableStore((state) => state.userTableColumnList)
  const userTableError = useUserTableStore((state) => state.userTableError)
  const userTableObjectList = useUserTableStore((state) => state.userTableObjectList)
  const fetchUserTable = useUserTableStore((state) => state.fetchUserTable)
  const updateObjectUserTable = useUserTableStore((state) => state.updateObjectUserTable)
  const loading = useUserTableStore((state) => state.loading)

  if (loading) return <LoaderSlack />

  return (
    <div className="flex flex-col gap-2 rounded-md border border-ownavbar bg-owcard px-8 py-8">
      <h4 className="flex items-center gap-2 pb-2 text-base font-bold text-zinc-300">
        <i>
          <Table size={20} />
        </i>
        <span className="text-amber-400">{userTableObject.name}</span>
      </h4>

      {/* Alerta de error */}
      {userTableError && <AlertMessages message={userTableError} type="error" />}

      {/* Multiples objetos */}
      {userTableObjectList.length > 0 && (
        <LinkObjectList objectList={userTableObjectList} updateObject={updateObjectUserTable} fetchObjectAction={fetchUserTable} />
      )}

      {/* Descripción del usertable */}
      {userTableColumnList && <TableDescription />}
    </div>
  )
}

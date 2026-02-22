import { dialogSearchContext } from '@sqldefinition/contexts/dialogSearchContext'
import { useEffect } from 'react'

import { CircleLoader } from '@/components/loader'
import { AxiosCall } from '@/models'
import { FullSysObject } from '@/models/sysobject'

import { searchContext } from '../../context/searchContext'
import { useRecents } from '../../hooks/useRecents'
import { CardWrapper } from './components/CardWrapper'
import { Item } from './components/Item'
import { Recents } from './components/Recents'

interface Props {
  getObject(id: number): AxiosCall<FullSysObject>
}

export function Results({ getObject }: Props) {
  const { suggestions, querySearch, loading } = searchContext()
  const { open, updateOpen } = dialogSearchContext()
  const { recents, getRecents } = useRecents('ALL_EXCEPT_USERTABLE')

  useEffect(() => {
    if (!open) return
    getRecents()
  }, [open])

  const isSearching = querySearch.length > 2
  const noResults = isSearching && suggestions.length === 0

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      {loading && <CircleLoader visible={true} color="white" />}

      {!loading && noResults && <p className="text-secondary mt-5 text-center">Sin resultados</p>}

      {!loading && !isSearching && recents.length > 0 && <Recents recents={recents} getObject={getObject} updateOpen={updateOpen} />}

      {!loading && isSearching && suggestions.length > 0 && (
        <CardWrapper title="Sugerencias">
          {suggestions.map((data) => (
            <Item key={data.id} objectId={data.id} getObject={getObject} updateOpen={updateOpen}>
              <div className="flex w-full items-center justify-between gap-1 transition-colors">
                <p className="flex flex-col">
                  <span className="text-secondary overflow-hidden text-[0.75rem]">{data.schema}</span>
                  <span className="text-primary group-hover:text-primary overflow-hidden">{data.name}</span>
                </p>
                <span className="bg-background-neutral text-secondary overflow-hidden rounded-sm px-1 py-0.5 text-[0.65rem] font-bold">
                  {data.typeDesc}
                </span>
              </div>
            </Item>
          ))}
        </CardWrapper>
      )}
    </div>
  )
}

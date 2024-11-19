import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { useEditorStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

export function ObjectInfoCard() {
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const currentLocation = useLocation()

  const SQLDefinitionObject = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const userTableObject = useUserTableStore((state) => state.userTableObject)
  const aligmentObject = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)

  const object = currentLocation.pathname === ROUTES.SQL_DEFINITION ? { ...SQLDefinitionObject } : { ...userTableObject }

  const info = [
    {
      id: 1,
      title: 'schema:',
      value: object.schema ?? '',
      className: 'bg-rose-400/20 text-rose-400',
    },
    {
      id: 2,
      title: 'tipo:',
      value: object.typeDesc ?? '',
      has_tag: true,
      tag: object.type ? `(${object.type})` : '',
      className: 'bg-cyan-400/20 text-cyan-400',
    },
    {
      id: 3,
      title: 'fecha de creación:',
      value: object.createDate ?? '',
      className: 'bg-emerald-500/20 text-emerald-500',
    },
    {
      id: 4,
      title: 'fecha de modificación:',
      value: object.modifyDate ?? '',
      className: 'bg-indigo-400/20 text-indigo-400',
    },
  ]

  const infoAligment = [
    {
      id: 1,
      title: 'schema:',
      value: aligmentObject.schema ?? '',
      className: 'bg-rose-400/20 text-rose-400',
    },
    {
      id: 2,
      title: 'tipo:',
      value: aligmentObject.typeDesc ?? '',
      has_tag: true,
      tag: aligmentObject.type ? `(${aligmentObject.type})` : '',
      className: 'bg-cyan-400/20 text-cyan-400',
    },
    {
      id: 3,
      title: 'fecha de creación:',
      value: aligmentObject.createDate ?? '',
      className: 'bg-emerald-500/20 text-emerald-500',
    },
    {
      id: 4,
      title: 'fecha de modificación:',
      value: aligmentObject.modifyDate ?? '',
      className: 'bg-indigo-400/20 text-indigo-400',
    },
  ]

  if (SQLDefinitionObject.id == null) return

  return (
    <>
      {!onDiffEditor ? (
        <ListObjectProperties info={info} />
      ) : (
        <div className="flex gap-2">
          <div className="flex basis-1/2 flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-400">Objeto de alineación</span>
            <ListObjectProperties info={infoAligment} />
          </div>

          <div className="flex basis-1/2 flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-400">Objeto local</span>
            <ListObjectProperties info={info} />
          </div>
        </div>
      )}
    </>
  )
}

function ListObjectProperties({ info }) {
  return (
    <ul className="flex flex-col flex-wrap gap-2 sm:flex-row">
      {info.map((item) => (
        <li
          key={item.id}
          className="flex max-w-64 items-center justify-between gap-6 rounded-sm border border-owborder bg-card px-2.5 py-1.5"
        >
          <div className="flex items-baseline gap-2">
            <h6 className="text-xs font-normal text-zinc-600 dark:text-zinc-400">{item.title}</h6>
            <p className="text-xs font-medium text-slate-300 dark:text-zinc-100">
              <span>{item.value} </span>
              {item.has_tag && <span className="text-xs text-amber-400">{item.tag}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

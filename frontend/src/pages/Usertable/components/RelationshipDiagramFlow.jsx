// import React, { useCallback } from 'react'
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react'
// import '@xyflow/react/dist/style.css'
// // import { useObjectStore } from '@/stores/object.store'

// // const initialNodes = [
// //   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
// //   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// // ]
// // const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

// function UserTablePresentation({ table }) {
//   return (
//     <div className="rounded-[2px] border-t-8 border-t-emerald-500 px-3 py-2">
//       <h4 className="pb-2 font-bold">{`${table.referencedSchema}.${table.referencedObject}`}</h4>

//       <div className="flex justify-between">
//         <span>{table.referencedColumn}</span>
//         <span>int</span>
//       </div>
//     </div>
//   )
// }

// export function RelationshipDiagramFlow() {
//   // const userTableForeignKeyList = useObjectStore(
//   //   (state) => state.userTableForeignKeyList,
//   // )
//   // const userTableObject = useObjectStore((state) => state.userTableObject)
//   // console.log('foreign key', userTableForeignKeyList)

//   const initialNodes = userTableForeignKeyList.map((fk, index) => {
//     const up = 140
//     const down = 100
//     return {
//       // id: String(fk.referencedObjectId),
//       id: String(fk.referencedObjectId),
//       position: { x: down * index, y: up * index },
//       data: { label: <UserTablePresentation table={fk} /> },
//       width: 300,
//       style: { padding: 0 },
//     }
//   })

//   initialNodes.push({
//     id: String(userTableObject.id),
//     position: { x: 600, y: 200 },
//     data: {
//       label: (
//         <UserTablePresentation
//           table={{
//             referencedSchema: userTableObject.schema,
//             referencedObject: userTableObject.name,
//             referencedColumn: 'id',
//           }}
//         />
//       ),
//     },
//     width: 300,
//     style: { padding: 0 },
//   })
//   console.log(userTableForeignKeyList)
//   console.log(initialNodes)

//   // const initialEdges = userTableForeignKeyList.map((fk) => ({
//   //   id: `e${fk.columnId}`,
//   //   source: fk.columnId,
//   //   target: fk.referencedColumnId,
//   // }))

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
//   // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

//   // const onConnect = useCallback(
//   //   (params) => setEdges((eds) => addEdge(params, eds)),
//   //   [setEdges],
//   // )

//   return (
//     <div style={{ width: '100%', height: '90vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         // edges={edges}
//         onNodesChange={onNodesChange}
//         // onEdgesChange={onEdgesChange}
//         // onConnect={onConnect}
//         colorMode="dark"
//       >
//         <Controls />
//         <MiniMap />
//         <Background variant="dots" gap={12} size={1} />
//       </ReactFlow>
//     </div>
//   )
// }

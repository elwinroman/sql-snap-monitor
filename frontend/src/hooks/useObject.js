import { useState } from 'react'

async function getObject({ name }) {
  const response = await fetch(
    `http://localhost:3000/object/definition/${name}?schema=dbo`,
  )
  const res = await response.json()

  if (res.success) return res.success
  return res
}

const formatData = ({ data }) => {
  console.log(data)
  return data
    .map((item) => {
      return item.code_text
    })
    .join('')
}

export function useObject() {
  const [object, setObject] = useState({
    schemaName: 'dbo',
    name: '',
    type: '',
    typeDesc: '',
    createDate: '',
    modifyDate: '',
    codeString: '',
  })

  const updateNameObject = async ({ name }) => {
    try {
      const res = await getObject({ name })
      if (res.error) {
        console.error(res.error)
        return
      }
      setObject({
        schemaName: res.schemaName,
        name: res.name,
        type: res.type,
        typeDesc: res.typeDesc,
        createDate: res.create_date,
        modifyDate: res.modify_date,
        codeString: formatData({ data: res.data }),
      })
    } catch (err) {
      console.error(err)
    }
  }
  return { object, updateNameObject }
}

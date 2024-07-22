import './App.css'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useState } from 'react'

SyntaxHighlighter.registerLanguage('sql', sql)

function App () {
  const [codeString, setCodeString] = useState('')
  const [request, setRequest] = useState('definition')
  const [descriptions, setDescriptions] = useState({
    info: 'No info',
    columns: ['No columns'],
    object: ['No object']
  })

  const handleClick = (e) => {
    e.preventDefault()
    const input = document.querySelector('input')
    const objectName = input.value.trim()

    if (request === 'definition') {
      const url = `http://localhost:3000/dbobject/definition/${objectName}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setCodeString(data.error.message)
            return
          }
          const formatedCodeString = data.success.data.map((line) => line.code_text).join('')
          setCodeString(formatedCodeString)
        })
    } else {
      const url = `http://localhost:3000/dbobject/description/${objectName}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setDescriptions({
              info: data.error.message,
              columns: ['No columns'],
              object: ['No object']
            })
          }
          setDescriptions({
            info: data.success.name,
            columns: data.success.data.column_description,
            object: data.success.data.object_description
          })
        })
    }
  }

  const handleChange = (e) => {
    setRequest(e.target.value)
  }

  return (
    <>
      <section className="container">
        <div className="select">
          <select onChange={handleChange}>
            <option value="definition" selected>Obtener definición de objetos</option>
            <option value="description">Obtener descripciones de objetos</option>
          </select>
        </div>

        <input type="text" />
        <button onClick={handleClick}>Buscar</button>

        { request === 'definition' &&
          <div>
            <h1>Definición de objeto</h1>
            <SyntaxHighlighter
              language="sql"
              style={dracula}
              showLineNumbers={true}
              // wrapLines={true}
              // lineProps={{ className: 'line' }} // pasa props al <span> que contiene la linea //'class'
              customStyle={{ tabSize: 4 }} // <pre> tag
              // codeTagProps={{ style: { border: '1px solid red' } }} // <code> tag
              // lineNumberContainerStyle = {{border: '1px solid blue'}} // This is not working
              // lineNumberStyle={{color: 'red'}} // <span class='linenumber'> tag
              >
              {codeString}
            </SyntaxHighlighter>
          </div>
        }
        {
          request === 'description' &&
          <div>
            <h1>Descripción de objeto</h1>

            <div className="table-container">
              <table className="table-object">
                {
                  descriptions.object.map((description, index) => {
                    if (description.length === 0) {
                      return (
                        <tr key={index}>
                          <td>No hay descripción NULL</td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={index}>
                        <td>{descriptions.info}</td>
                        <td>{description.value}</td>
                        <td>{description.property_name}</td>
                      </tr>
                    )
                  })
                }
              </table>

              <table className="table-colums">
                <tr>
                  <th>id</th>
                  <th>object</th>
                  <th>name</th>
                  <th>value</th>
                  <th>column_id</th>
                  <th>minor_id</th>
                  <th>property_name</th>
                </tr>
                {
                  descriptions.columns.map((description, index) => {
                    if (description.length === 0) {
                      return (
                        <tr key={index}>
                          <td>No hay descripción NULL</td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{descriptions.info}</td>
                        <td>{description.name}</td>
                        <td>{description.value}</td>
                        <td>{description.column_id}</td>
                        <td>{description.minor_id}</td>
                        <td>{description.property_name}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          </div>
        }
      </section>
    </>
  )
}

export default App

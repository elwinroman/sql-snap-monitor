import express from 'express'
import 'dotenv/config'
import { DBObjectModel } from './src/models/DBObjectModel.js'
import cors from 'cors'

const app = express()
app.use(cors())

const PORT = process.env.PORT ?? 1234

app.get('/dbobject/:name', async (req, res) => {
  const { name } = req.params
  const { schema } = req.query

  try {
    const result = await DBObjectModel.getObject({ name, schema })
    if (result.error) {
      res.status(404).json(result)
      return
    }

    res.json(result)
  } catch (err) {
    // console.log(err)
    res.status(404).send(err)
  }
})

app.get('/dbobject/definition/:name', async (req, res) => {
  const { name } = req.params
  const { schema } = req.query

  try {
    const result = await DBObjectModel.getObjectDefinition({ name, schema })
    if (result.error) {
      res.status(404).json(result)
      return
    }

    res.json(result)
  } catch (err) {
    // console.log(err)
    res.status(404).send(err)
  }
})

app.get('/dbobject/description/:name', async (req, res) => {
  const { name } = req.params
  const { schema } = req.query

  try {
    const result = await DBObjectModel.getObjectDescription({ name, schema })
    if (result.error) {
      res.status(404).json(result)
      return
    }

    res.json(result)
  } catch (err) {
    // console.log(err)
    res.status(404).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`El servidor está ejecutandos en el puerto http://localhost:${PORT}`)
})

// const ERRORS_CODE = {
//   EREQUEST: 'EREQUEST', //Message from SQL Server. Error object contains additional details.
//   ELOGIN: 'ELOGIN', //Login failed.
// }

/*
Sales.vPersonDemographics (View)
HumanResources.vJobCandidateEducation (View)

Person.PhoneNumberType (User Table)
Person.BusinessEntityAddress (User Table)

Sales.iduSalesOrderDetail (SQL Trigger)
Purchasing.iPurchaseOrderDetail (SQL Trigger)

uspSearchCandidateResumes (SQL Stored Procedure)
uspGetEmployeeManagers (SQL Stored Procedure)

ufnGetDocumentStatusText (SQL Scalar Function)
ufnGetAccountingStartDate (SQL Scalar Function)

ufnGetContactInformation (SQL Table-valued Function)
*/

import { ERROR_CODES } from '../constants/error-codes.js'

export class ObjectController {
  constructor ({ objectModel }) {
    this.objectModel = objectModel
  }

  getObjectDefinition = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.objectModel.getObjectDefinition({ id })
      if (result.error) {
        res.status(result.statusCode).json(result)
        return
      }

      res.json(result)
    } catch (err) {
      const { statusCode } = ERROR_CODES.INTERNAL_SERVER_ERROR
      res.status(statusCode).json(ERROR_CODES.INTERNAL_SERVER_ERROR)
    }
  }

  getObjectDescription = async (req, res) => {
    const { name } = req.params
    const { schema } = req.query

    try {
      const result = await this.objectModel.getObjectDescription({ name, schema })
      if (result.error) {
        res.status(404).json(result)
        return
      }

      res.json(result)
    } catch (err) {
      res.status(404).send(err)
    }
  }

  getOneObject = async (req, res) => {
    const { name } = req.params
    const { schema } = req.query

    try {
      const result = await this.objectModel.findOneObject({ name, schema })
      if (result.error) {
        res.status(404).json(result)
        return
      }

      res.json(result)
    } catch (err) {
      res.status(404).send(err)
    }
  }
}

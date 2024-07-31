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
    const { id } = req.params

    try {
      const result = await this.objectModel.getObjectDescription({ id })
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

  findObject = async (req, res) => {
    const { name } = req.params

    try {
      const result = await this.objectModel.findObject({ name })
      if (result.error) {
        res.json(result)
        return
      }

      res.json(result)
    } catch (err) {
      const { statusCode } = ERROR_CODES.INTERNAL_SERVER_ERROR
      res.status(statusCode).json(ERROR_CODES.INTERNAL_SERVER_ERROR)
    }
  }

  getAnyQuery = async (req, res) => {
    console.log('hola')
    try {
      const result = await this.objectModel.getAnyQuery()
      if (result.error) {
        res.json(result)
        return
      }

      res.json(result)
    } catch (err) {
      res.send(err)
    }
  }
}

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
      res.status(statusCode).json({ ...ERROR_CODES.INTERNAL_SERVER_ERROR, originalError: err.originalError })
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
      res.status(statusCode).json({ ...ERROR_CODES.INTERNAL_SERVER_ERROR, originalError: err.originalError })
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
      res.status(statusCode).json({ ...ERROR_CODES.INTERNAL_SERVER_ERROR, originalError: err.originalError })
    }
  }
}

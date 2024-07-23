export class ObjectController {
  constructor ({ objectModel }) {
    this.objectModel = objectModel
  }

  getObjectDefinition = async (req, res) => {
    const { name } = req.params
    const { schema } = req.query

    try {
      const result = await this.objectModel.getObjectDefinition({ name, schema })
      if (result.error) {
        res.status(404).json(result)
        return
      }

      res.json(result)
    } catch (err) {
      res.status(404).send(err)
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

  getObject = async (req, res) => {
    const { name } = req.params
    const { schema } = req.query

    try {
      const result = await this.objectModel.getObject({ name, schema })
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

import ProductService from '../services/ProductService'

class ProductController {
  async create (req, res) {
    try {
      const { name, age } = req.body
      const result = await ProductService.create({ name, age })
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()

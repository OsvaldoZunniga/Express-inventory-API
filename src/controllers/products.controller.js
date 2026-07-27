const productsService = require("../services/products.service");

const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.listProducts();
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productsService.findProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productsService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productsService.updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productsService.removeProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

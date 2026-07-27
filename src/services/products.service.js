const mongoose = require("mongoose");

const Product = require("../models/product.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }

  if (payload.price !== undefined) {
    normalized.price = Number(payload.price);
  }

  if (payload.stock !== undefined) {
    normalized.stock = Number(payload.stock);
  }

  return normalized;
};

const listProducts = async () => {
  return Product.find().sort({ createdAt: -1 });
};

const findProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Product.findById(id);
};

const createProduct = async (payload) => {
  const normalized = normalizePayload(payload);
  return Product.create(normalized);
};

const updateProduct = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);

  return Product.findByIdAndUpdate(id, normalized, {
    new: true,
    runValidators: true
  });
};

const removeProduct = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  const deleted = await Product.findByIdAndDelete(id);
  return Boolean(deleted);
};

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  updateProduct,
  removeProduct
};

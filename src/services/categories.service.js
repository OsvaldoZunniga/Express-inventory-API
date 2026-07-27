const mongoose = require("mongoose");

const Category = require("../models/category.model");
const Product = require("../models/product.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};
  if (payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }
  if (payload.description !== undefined) {
    normalized.description = String(payload.description).trim();
  }
  if (payload.isActive !== undefined) {
    normalized.isActive = Boolean(payload.isActive);
  }
  return normalized;
};
const listCategories = async () => {
  return Category.find().sort({ createdAt: -1 });
};
const findCategoryById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Category.findById(id);
};
const createCategory = async (payload) => {
  const normalized = normalizePayload(payload);
  return Category.create(normalized);
};
const updateCategory = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const normalized = normalizePayload(payload);
  return Category.findByIdAndUpdate(id, normalized, { new: true });
};
const removeCategory = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  const category = await Category.findById(id);

  if (!category) {
    return false;
  }

  const hasProducts = await Product.exists({ categoryId: id });

  if (hasProducts) {
    const error = new Error(
      "No se puede eliminar una categoría con productos asociados",
    );
    error.status = 400;
    throw error;
  }

  await Category.findByIdAndDelete(id);
  return true;
};

module.exports = {
  normalizePayload,
  listCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
};

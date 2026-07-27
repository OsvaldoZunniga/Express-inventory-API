const mongoose = require("mongoose");

const Category = require("../models/category.model");

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
  const deleted = await Category.findByIdAndDelete(id);
  return Boolean(deleted);
};

module.exports = {
  normalizePayload,
  listCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
};

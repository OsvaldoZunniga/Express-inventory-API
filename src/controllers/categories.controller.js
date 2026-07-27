const categoryService = require("../services/categories.service");

const validateExists = (exists, res) => {
  if (!exists) {
    res.status(404).json({ message: "Categoria no encontrada" });
    return false;
  }
  return true;
};
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.listCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.findCategoryById(req.params.id);
    if (!validateExists(category, res)) return;
    res.json(category);
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
    );
    if (!validateExists(category, res)) return;
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await categoryService.removeCategory(req.params.id);
    if (!validateExists(deleted, res)) return;
    res.json({ message: "Categoria eliminada exitosamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

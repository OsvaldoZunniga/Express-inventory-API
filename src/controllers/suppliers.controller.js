const supplierService = require("../services/suppliers.service");

const validateExists = (exists, res) => {
  if (!exists) {
    res.status(404).json({ message: "Proveedor no encontrado" });
    return false;
  }
  return true;
};

const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.listSuppliers();
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await supplierService.findSupplierById(req.params.id);
    if (!validateExists(supplier, res)) return;
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id,
      req.body,
    );
    if (!validateExists(supplier, res)) return;
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const deleted = await supplierService.removeSupplier(req.params.id);
    if (!validateExists(deleted, res)) return;
    res.json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};

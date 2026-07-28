const mongoose = require("mongoose");

const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");

const normalizePayload = (payload = {}) => {
  const normalized = {};

  if (payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }

  if (payload.email !== undefined) {
    normalized.email = String(payload.email).trim().toLowerCase();
  }

  if (payload.phone !== undefined) {
    normalized.phone = String(payload.phone).trim();
  }

  if (payload.address !== undefined) {
    normalized.address = String(payload.address).trim();
  }

  return normalized;
};

const listSuppliers = async () => {
  return Supplier.find().sort({ createdAt: -1 });
};

const findSupplierById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Supplier.findById(id);
};

const createSupplier = async (payload) => {
  const normalized = normalizePayload(payload);
  return Supplier.create(normalized);
};

const updateSupplier = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const normalized = normalizePayload(payload);
  return Supplier.findByIdAndUpdate(id, normalized, { new: true });
};

const removeSupplier = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    return false;
  }

  const hasProducts = await Product.exists({ supplierId: id });

  if (hasProducts) {
    const error = new Error(
      "No se puede eliminar un proveedor con productos asociados",
    );
    error.status = 400;
    throw error;
  }

  await Supplier.findByIdAndDelete(id);
  return true;
};

module.exports = {
  normalizePayload,
  listSuppliers,
  findSupplierById,
  createSupplier,
  updateSupplier,
  removeSupplier,
};

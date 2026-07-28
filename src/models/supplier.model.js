const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo 'name' es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El campo 'email' es obligatorio"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "El campo 'phone' es obligatorio"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;

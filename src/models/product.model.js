const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo 'name' es obligatorio"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "El campo 'price' es obligatorio"],
      min: [0, "El campo 'price' debe ser mayor o igual a 0"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El campo 'stock' debe ser mayor o igual a 0"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "El campo 'category' es obligatorio"],
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

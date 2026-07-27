const express = require("express");

const productsRoutes = require("./routes/products.routes");
const categoriesRoutes = require("./routes/categories.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de productos activa",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories",
    },
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");

    return res.status(400).json({ message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "ID invalido" });
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.status || 500).json({
    message: error.message || "Error interno del servidor",
  });
});

module.exports = app;

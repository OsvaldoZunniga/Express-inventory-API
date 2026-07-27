const mongoose = require("mongoose");
const dns = require("dns");

// Configurar servidores DNS 
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Falta la variable de entorno MONGODB_URI");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

module.exports = {
  connectDatabase
};

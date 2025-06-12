const mongoose = require('mongoose');

const numeroDeClasesSchema = new mongoose.Schema({
  numero_de_clases: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('numero_de_clases', numeroDeClasesSchema);
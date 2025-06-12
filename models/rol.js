const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'roles'  // Especifica el nombre exacto de tu colección
});

module.exports = mongoose.models.Rol || mongoose.model('Rol', rolSchema);

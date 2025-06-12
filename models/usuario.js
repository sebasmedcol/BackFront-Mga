const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  },
  estado: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'usuarios'  // Especifica el nombre exacto de tu colección
});

module.exports = mongoose.model('Usuario', usuarioSchema);
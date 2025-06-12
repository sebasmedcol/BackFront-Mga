const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  tipoDocumento: {
    type: String,
    required: true,
    enum: ['CC', 'CE', 'TI', 'PP']
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, {
  timestamps: true
});

// En models/Profesor.js, cambia la última línea por:
module.exports = mongoose.model('Profesor', profesorSchema, 'profesores');
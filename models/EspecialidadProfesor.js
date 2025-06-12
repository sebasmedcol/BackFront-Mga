const mongoose = require('mongoose');

const especialidadProfesorSchema = new mongoose.Schema({
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profesor'
  },
  especialidad: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('especialidades_de_profesores', especialidadProfesorSchema);
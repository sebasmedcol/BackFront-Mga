const mongoose = require('mongoose');

const cursoHasNumeroDeClasesSchema = new mongoose.Schema({
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Curso'
  },
  numeroClasesId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'NumeroDeClases'
  }
});

module.exports = mongoose.model('curso_has_numero_de_clases', cursoHasNumeroDeClasesSchema);

const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  ventas: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ventas'
  },
  fechaPago: {
    type: Date,
    required: true
  },
  metodoPago: {
    type: String,
    required: true,
    enum: ['Tarjeta', 'Transferencia', 'Efectivo']
  },
  estado: {
    type: String,
    required: true,
    enum: ['pagado', 'anulado'],
    default: 'pagado'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pago', pagoSchema);
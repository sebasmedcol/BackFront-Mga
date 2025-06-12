const Pago = require('../models/Pago');

// GET - Get all payments
exports.getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().populate('ventas');
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Get payment by ID
exports.getPagoById = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id).populate('ventas');
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Create new payment
exports.createPago = async (req, res) => {
  const pago = new Pago({
    ventas: req.body.ventas,
    fechaPago: req.body.fechaPago,
    metodoPago: req.body.metodoPago,
    estado: req.body.estado
  });

  try {
    const newPago = await pago.save();
    res.status(201).json(newPago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Update payment
exports.updatePago = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id);
    if (pago) {
      Object.assign(pago, req.body);
      const updatedPago = await pago.save();
      res.json(updatedPago);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Delete payment
exports.deletePago = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id);
    if (pago) {
      await pago.deleteOne();
      res.json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Payment routes
router.get('/', pagoController.getPagos);
router.get('/:id', pagoController.getPagoById);
router.post('/', pagoController.createPago);
router.put('/:id', pagoController.updatePago);
router.delete('/:id', pagoController.deletePago);

module.exports = router;
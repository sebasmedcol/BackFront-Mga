const express = require('express');
const router = express.Router();
const cursoHasNumeroDeClasesController = require('../controllers/cursoHasNumeroDeClasesController');

// Routes
router.get('/', cursoHasNumeroDeClasesController.getAll);
router.get('/:id', cursoHasNumeroDeClasesController.getById);
router.post('/', cursoHasNumeroDeClasesController.create);
router.put('/:id', cursoHasNumeroDeClasesController.update);
router.delete('/:id', cursoHasNumeroDeClasesController.delete);

module.exports = router;
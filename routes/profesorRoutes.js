const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorController');

// Rutas para profesores
router.get('/', profesorController.getProfesores);
router.get('/:id', profesorController.getProfesorById);
router.post('/', profesorController.createProfesor);
router.put('/:id', profesorController.updateProfesor);
router.delete('/:id', profesorController.deleteProfesor);

module.exports = router;
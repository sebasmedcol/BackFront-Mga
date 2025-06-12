const Profesor = require('../models/Profesor');

// GET - Obtener todos los profesores
exports.getProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener un profesor por ID
exports.getProfesorById = async (req, res) => {
  try {
    const profesor = await Profesor.findById(req.params.id);
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crear nuevo profesor
exports.createProfesor = async (req, res) => {
  const profesor = new Profesor({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    tipoDocumento: req.body.tipoDocumento,
    identificacion: req.body.identificacion,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    estado: req.body.estado,
    usuario: req.body.usuario
  });

  try {
    const nuevoProfesor = await profesor.save();
    res.status(201).json(nuevoProfesor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Actualizar profesor
exports.updateProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findById(req.params.id);
    if (profesor) {
      Object.assign(profesor, req.body);
      const profesorActualizado = await profesor.save();
      res.json(profesorActualizado);
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Eliminar profesor
exports.deleteProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findById(req.params.id);
    if (profesor) {
      await profesor.deleteOne();
      res.json({ message: 'Profesor eliminado' });
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
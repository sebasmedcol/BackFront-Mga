const ProgramacionProfesor = require('../models/ProgramacionProfesor');

// GET - Obtener todas las programaciones de profesores
exports.getProgramacionesProfesores = async (req, res) => {
  try {
    const programaciones = await ProgramacionProfesor.find()
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    res.json(programaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener programación de profesor por ID
exports.getProgramacionProfesorById = async (req, res) => {
  try {
    const programacion = await ProgramacionProfesor.findById(req.params.id)
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    if (programacion) {
      res.json(programacion);
    } else {
      res.status(404).json({ message: 'Programación de profesor no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener programaciones por profesor
exports.getProgramacionesByProfesor = async (req, res) => {
  try {
    const programaciones = await ProgramacionProfesor.find({ profesor: req.params.profesorId })
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    res.json(programaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener programaciones por fecha
exports.getProgramacionesByFecha = async (req, res) => {
  try {
    const fecha = new Date(req.params.fecha);
    const programaciones = await ProgramacionProfesor.find({ fecha: fecha })
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    res.json(programaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener programaciones por estado
exports.getProgramacionesByEstado = async (req, res) => {
  try {
    const programaciones = await ProgramacionProfesor.find({ estado: req.params.estado })
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    res.json(programaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crear nueva programación de profesor
exports.createProgramacionProfesor = async (req, res) => {
  const programacion = new ProgramacionProfesor(req.body);
  try {
    const nuevaProgramacion = await programacion.save();
    const programacionPopulada = await ProgramacionProfesor.findById(nuevaProgramacion._id)
      .populate('profesor', 'nombre apellido email')
      .populate('programacionesClases');
    res.status(201).json(programacionPopulada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Actualizar programación de profesor
exports.updateProgramacionProfesor = async (req, res) => {
  try {
    const programacion = await ProgramacionProfesor.findById(req.params.id);
    if (programacion) {
      Object.assign(programacion, req.body);
      const programacionActualizada = await programacion.save();
      const programacionPopulada = await ProgramacionProfesor.findById(programacionActualizada._id)
        .populate('profesor', 'nombre apellido email')
        .populate('programacionesClases');
      res.json(programacionPopulada);
    } else {
      res.status(404).json({ message: 'Programación de profesor no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH - Actualizar estado de programación
exports.updateEstadoProgramacion = async (req, res) => {
  try {
    const { estado, motivo } = req.body;
    const programacion = await ProgramacionProfesor.findById(req.params.id);
    if (programacion) {
      programacion.estado = estado;
      if (motivo !== undefined) {
        programacion.motivo = motivo;
      }
      const programacionActualizada = await programacion.save();
      const programacionPopulada = await ProgramacionProfesor.findById(programacionActualizada._id)
        .populate('profesor', 'nombre apellido email')
        .populate('programacionesClases');
      res.json(programacionPopulada);
    } else {
      res.status(404).json({ message: 'Programación de profesor no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Eliminar programación de profesor
exports.deleteProgramacionProfesor = async (req, res) => {
  try {
    const programacion = await ProgramacionProfesor.findById(req.params.id);
    if (programacion) {
      await programacion.deleteOne();
      res.json({ message: 'Programación de profesor eliminada' });
    } else {
      res.status(404).json({ message: 'Programación de profesor no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
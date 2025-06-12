const Rol = require('../models/Rol');

// GET - Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener un rol por ID
exports.getRolById = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crear nuevo rol
exports.createRol = async (req, res) => {
  const rol = new Rol({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado
  });

  try {
    const nuevoRol = await rol.save();
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Actualizar rol
exports.updateRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (rol) {
      Object.assign(rol, req.body);
      const rolActualizado = await rol.save();
      res.json(rolActualizado);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Eliminar rol
exports.deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (rol) {
      await rol.deleteOne();
      res.json({ message: 'Rol eliminado' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
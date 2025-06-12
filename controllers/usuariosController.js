const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// GET - Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crear nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email: req.body.email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña si se proporciona
    let passwordHash = req.body.password;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(req.body.password, salt);
    }

    const usuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      password: passwordHash,
      rol: req.body.rol,
      estado: req.body.estado
    });

    const nuevoUsuario = await usuario.save();
    
    // Retornar usuario sin contraseña
    const usuarioRespuesta = nuevoUsuario.toObject();
    delete usuarioRespuesta.password;
    
    res.status(201).json(usuarioRespuesta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario) {
      // Si se proporciona una nueva contraseña, encriptarla
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      Object.assign(usuario, req.body);
      const usuarioActualizado = await usuario.save();
      
      // Retornar usuario sin contraseña
      const usuarioRespuesta = usuarioActualizado.toObject();
      delete usuarioRespuesta.password;
      
      res.json(usuarioRespuesta);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario) {
      await usuario.deleteOne();
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const CursoHasNumeroDeClases = require('../models/CursoHasNumeroDeClases');

// GET - Get all course-class number relationships
exports.getAll = async (req, res) => {
  try {
    const relationships = await CursoHasNumeroDeClases.find();
    res.json(relationships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Get relationship by ID
exports.getById = async (req, res) => {
  try {
    const relationship = await CursoHasNumeroDeClases.findById(req.params.id);
    if (relationship) {
      res.json(relationship);
    } else {
      res.status(404).json({ message: 'Relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Create new relationship
exports.create = async (req, res) => {
  const relationship = new CursoHasNumeroDeClases({
    cursoId: req.body.cursoId,
    numeroClasesId: req.body.numeroClasesId
  });

  try {
    const newRelationship = await relationship.save();
    res.status(201).json(newRelationship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Update relationship
exports.update = async (req, res) => {
  try {
    const relationship = await CursoHasNumeroDeClases.findById(req.params.id);
    if (relationship) {
      Object.assign(relationship, req.body);
      const updatedRelationship = await relationship.save();
      res.json(updatedRelationship);
    } else {
      res.status(404).json({ message: 'Relationship not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Delete relationship
exports.delete = async (req, res) => {
  try {
    const relationship = await CursoHasNumeroDeClases.findById(req.params.id);
    if (relationship) {
      await relationship.deleteOne();
      res.json({ message: 'Relationship deleted successfully' });
    } else {
      res.status(404).json({ message: 'Relationship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
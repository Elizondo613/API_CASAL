const Reto = require('../models/Reto');

// 1. Crear un nuevo reto
exports.createReto = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newReto = new Reto({ text, category });
    await newReto.save();
    res.status(201).json({ message: 'Reto creado correctamente', reto: newReto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Obtener todos los retos
exports.getAllRetos = async (req, res) => {
  try {
    const retos = await Reto.find();
    res.json(retos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Obtener un reto por ID
exports.getRetoById = async (req, res) => {
  try {
    const { id } = req.params;
    const reto = await Reto.findById(id);
    if (!reto) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }
    res.json(reto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar un reto
exports.updateReto = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, category, active } = req.body;
    const updatedReto = await Reto.findByIdAndUpdate(
      id,
      { text, category, active },
      { new: true }
    );
    if (!updatedReto) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }
    res.json({ message: 'Reto actualizado correctamente', reto: updatedReto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar un reto
exports.deleteReto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReto = await Reto.findByIdAndDelete(id);
    if (!deletedReto) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }
    res.json({ message: 'Reto eliminado correctamente', reto: deletedReto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Obtener un reto aleatorio (filtrando solo los activos)
exports.getRandomRetoR = async (req, res) => {
  try {
    // Contar cuántos retos activos hay
    const count = await Reto.countDocuments({ active: true });

    if (count === 0) {
      return res.status(404).json({ message: 'No hay retos activos disponibles' });
    }

    // Generar un índice aleatorio basado en el número de documentos
    const randomIndex = Math.floor(Math.random() * count);

    // Obtener un reto aleatorio usando el índice generado
    const reto = await Reto.findOne({ active: true }).skip(randomIndex);

    if (!reto) {
      return res.status(404).json({ message: 'No se encontraron retos activos' });
    }

    // Devolver el reto seleccionado
    const { text, category, _id } = reto;
    res.json({
      retoId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Mimica = require('../models/Mimica');

// 1. Crear un nuevo reto de mimica
exports.createMimica = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newMimica = new Mimica({ text, category });
    await newMimica.save();
    res.status(201).json({ message: 'Reto de mimica creado correctamente', mimica: newMimica });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Obtener todos los retos de mimica
exports.getAllMimicas = async (req, res) => {
  try {
    const mimicas = await Mimica.find();
    res.json(mimicas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Obtener un reto de mimica por ID
exports.getMimicaById = async (req, res) => {
  try {
    const { id } = req.params;
    const mimica = await Mimica.findById(id);
    if (!mimica) {
      return res.status(404).json({ message: 'Reto de mimica no encontrado' });
    }
    res.json(mimica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar un reto de mimica
exports.updateMimica = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, category, active } = req.body;
    const updatedMimica = await Mimica.findByIdAndUpdate(
      id,
      { text, category, active },
      { new: true }
    );
    if (!updatedMimica) {
      return res.status(404).json({ message: 'Reto de mimica no encontrado' });
    }
    res.json({ message: 'Reto de mimica actualizado correctamente', mimica: updatedMimica });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar un reto de mimica
exports.deleteMimica = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMimica = await Mimica.findByIdAndDelete(id);
    if (!deletedMimica) {
      return res.status(404).json({ message: 'Reto de mimica no encontrado' });
    }
    res.json({ message: 'Reto de mimica eliminado correctamente', mimica: deletedMimica });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Obtener un reto de mimica aleatorio (filtrando solo los activos)
exports.getRandomMimica = async (req, res) => {
  try {
    // Contar cuántos retos activos hay
    const count = await Mimica.countDocuments({ active: true });

    if (count === 0) {
      return res.status(404).json({ message: 'No hay retos de mimica activos disponibles' });
    }

    // Generar un índice aleatorio basado en el número de documentos
    const randomIndex = Math.floor(Math.random() * count);

    // Obtener un reto aleatorio usando el índice generado
    const mimica = await Mimica.findOne({ active: true }).skip(randomIndex);

    if (!mimica) {
      return res.status(404).json({ message: 'No se encontraron retos de mimica activos' });
    }

    // Devolver el reto seleccionado
    const { text, category, _id } = mimica;
    res.json({
      mimicaId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
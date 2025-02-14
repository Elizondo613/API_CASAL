const Riddle = require('../models/Riddle');

// 1. Crear una nueva adivinanza
exports.createRiddle = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newRiddle = new Riddle({ text, category });
    await newRiddle.save();
    res.status(201).json({ message: 'Adivinanza creada correctamente', riddle: newRiddle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Obtener todas las adivinanzas
exports.getAllRiddles = async (req, res) => {
  try {
    const riddles = await Riddle.find();
    res.json(riddles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Obtener una adivinanza por ID
exports.getRiddleById = async (req, res) => {
  try {
    const { id } = req.params;
    const riddle = await Riddle.findById(id);
    if (!riddle) {
      return res.status(404).json({ message: 'Adivinanza no encontrada' });
    }
    res.json(riddle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar una adivinanza
exports.updateRiddle = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, category, active } = req.body;
    const updatedRiddle = await Riddle.findByIdAndUpdate(
      id,
      { text, category, active },
      { new: true }
    );
    if (!updatedRiddle) {
      return res.status(404).json({ message: 'Adivinanza no encontrada' });
    }
    res.json({ message: 'Adivinanza actualizada correctamente', riddle: updatedRiddle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar una adivinanza
exports.deleteRiddle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRiddle = await Riddle.findByIdAndDelete(id);
    if (!deletedRiddle) {
      return res.status(404).json({ message: 'Adivinanza no encontrada' });
    }
    res.json({ message: 'Adivinanza eliminada correctamente', riddle: deletedRiddle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Obtener una adivinanza aleatoria (filtrando solo las activas)
exports.getRandomRiddle = async (req, res) => {
  try {
    // Contar cuántas adivinanzas activas hay
    const count = await Riddle.countDocuments({ active: true });

    if (count === 0) {
      return res.status(404).json({ message: 'No hay adivinanzas activas disponibles' });
    }

    // Generar un índice aleatorio basado en el número de documentos
    const randomIndex = Math.floor(Math.random() * count);

    // Obtener una adivinanza aleatoria usando el índice generado
    const riddle = await Riddle.findOne({ active: true }).skip(randomIndex);

    if (!riddle) {
      return res.status(404).json({ message: 'No se encontraron adivinanzas activas' });
    }

    // Devolver la adivinanza seleccionada
    const { text, category, _id } = riddle;
    res.json({
      riddleId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
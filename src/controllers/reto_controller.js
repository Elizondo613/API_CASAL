const Reto = require('../models/Reto');

exports.getRandomRetoR = async (req, res) => {
  try {
    const reto = await Reto.aggregate([{ $sample: { size: 1 } }]);
    if (!reto.length) {
      return res.status(404).json({ message: 'No se encontraron retos' });
    }
    
    const { text, category, _id } = reto[0];
    res.json({
      retoId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
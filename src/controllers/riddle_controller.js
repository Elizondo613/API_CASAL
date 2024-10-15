const Riddle = require('../models/Riddle');

exports.getRandomRiddle = async (req, res) => {
  try {
    const riddle = await Riddle.aggregate([{ $sample: { size: 1 } }]);
    if (!riddle.length) {
      return res.status(404).json({ message: 'No se encontraron adivinanzas' });
    }
    
    const { text, category, _id } = riddle[0];
    res.json({
      riddleId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
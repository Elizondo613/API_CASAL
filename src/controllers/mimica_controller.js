const Mimica = require('../models/Mimica');

exports.getRandomMimica = async (req, res) => {
  try {
    const mimica = await Mimica.aggregate([{ $sample: { size: 1 } }]);
    if (!mimica.length) {
      return res.status(404).json({ message: 'No se encontraron mimicas' });
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
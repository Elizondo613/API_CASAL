// APAGADO
const Challenge = require('../models/retoLeyenda');

exports.getRandomReto = async (req, res) => {
  try {
    const challenge = await Challenge.aggregate([{ $sample: { size: 1 } }]);
    if (!challenge.length) {
      return res.status(404).json({ message: 'No se encontraron retos' });
    }
    
    const { text, category, _id } = challenge[0];
    res.json({
      challengeId: _id,
      text,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
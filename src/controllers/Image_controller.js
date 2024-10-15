const Image = require('../models/Image');

// Definimos la URL base local
const API_BASE_URL = 'https://api-casal.onrender.com'; // Asegúrate de que este puerto coincida con el de tu API

exports.getRandomImage = async (req, res) => {
  try {
    const image = await Image.aggregate([{ $sample: { size: 1 } }]);
    if (!image.length) {
      return res.status(404).json({ message: 'No se encontraron imágenes' });
    }
    
    const { url, description, category, _id } = image[0];
    
    res.json({
      imageId: _id,
      url: `${API_BASE_URL}/${url}`, // Construye la URL completa con la base local
      description,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
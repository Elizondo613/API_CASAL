const Image = require('../models/Image');

// Definimos la URL base local
const API_BASE_URL = 'https://api-casal.onrender.com'; // Asegúrate de que este puerto coincida con el de tu API

// 1. Crear una nueva imagen
exports.createImage = async (req, res) => {
  try {
    const { url, description, category } = req.body;
    const newImage = new Image({ url, description, category });
    await newImage.save();
    res.status(201).json({ message: 'Imagen creada correctamente', image: newImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Obtener todas las imágenes
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Obtener una imagen por ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar una imagen
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, description, category, active } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { url, description, category, active },
      { new: true }
    );
    if (!updatedImage) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json({ message: 'Imagen actualizada correctamente', image: updatedImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar una imagen
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json({ message: 'Imagen eliminada correctamente', image: deletedImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Obtener una imagen aleatoria (filtrando solo las activas)
exports.getRandomImage = async (req, res) => {
  try {
    // Contar cuántas imágenes activas hay
    const count = await Image.countDocuments({ active: true });

    if (count === 0) {
      return res.status(404).json({ message: 'No hay imágenes activas disponibles' });
    }

    // Generar un índice aleatorio basado en el número de documentos
    const randomIndex = Math.floor(Math.random() * count);

    // Obtener una imagen aleatoria usando el índice generado
    const image = await Image.findOne({ active: true }).skip(randomIndex);

    if (!image) {
      return res.status(404).json({ message: 'No se encontraron imágenes activas' });
    }

    // Devolver la imagen seleccionada
    const { url, description, category, _id } = image;
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
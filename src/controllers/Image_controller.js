const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');

// Definimos la URL base
const API_BASE_URL = 'https://api-casal.onrender.com';

// 1. Crear una nueva imagen
exports.createImage = async (req, res) => {
  try {
    // Determinar URL: Si hay archivo subido, crear ruta, sino usar la del body
    const url = req.file 
      ? `uploads/${req.file.filename}` 
      : req.body.url;
      
    const { description, category } = req.body;
    const active = req.body.active === 'true' || req.body.active === true;
    
    const newImage = new Image({ 
      url, 
      description, 
      category,
      type: 'image',
      active 
    });
    
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
    
    // Datos a actualizar
    const updateData = {};
    
    // Si hay campos en el body, actualizarlos
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.active !== undefined) {
      updateData.active = req.body.active === 'true' || req.body.active === true;
    }
    
    // Si hay archivo, actualizar URL y posiblemente eliminar archivo anterior
    if (req.file) {
      // Primero obtener la imagen actual para ver si necesitamos eliminar un archivo
      const currentImage = await Image.findById(id);
      if (currentImage && currentImage.url && currentImage.url.startsWith('uploads/')) {
        // Intentar eliminar el archivo anterior
        try {
          const oldFilePath = path.join(__dirname, '..', currentImage.url);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (err) {
          console.error('Error al eliminar archivo anterior:', err);
          // No interrumpir la actualización si falla la eliminación
        }
      }
      
      // Establecer nueva URL
      updateData.url = `uploads/${req.file.filename}`;
    } else if (req.body.url) {
      // Si no hay archivo pero sí URL en el body, actualizarla
      updateData.url = req.body.url;
    }
    
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      updateData,
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
    
    // Primero obtener la imagen para ver si hay archivo a eliminar
    const image = await Image.findById(id);
    
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    
    // Si la imagen tiene un archivo asociado, eliminarlo
    if (image.url && image.url.startsWith('uploads/')) {
      try {
        const filePath = path.join(__dirname, '..', image.url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error('Error al eliminar archivo:', err);
        // Continuar con la eliminación del registro aunque falle la eliminación del archivo
      }
    }
    
    const deletedImage = await Image.findByIdAndDelete(id);
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

    // Construir URL completa para imágenes en el servidor
    let fullUrl = image.url;
    if (image.url.startsWith('uploads/')) {
      fullUrl = `${API_BASE_URL}/${image.url}`;
    }

    // Devolver la imagen seleccionada
    const { description, category, _id } = image;
    res.json({
      imageId: _id,
      url: fullUrl,
      description,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
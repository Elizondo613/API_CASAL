const express = require('express');
const router = express.Router();
const imageController = require('../controllers/Image_controller');

// CRUD Endpoints
router.post('/image', imageController.createImage); // Crear una nueva imagen
router.get('/image', imageController.getAllImages); // Obtener todas las imágenes
router.get('/image/:id', imageController.getImageById); // Obtener una imagen por ID
router.put('/image/:id', imageController.updateImage); // Actualizar una imagen
router.delete('/image/:id', imageController.deleteImage); // Eliminar una imagen

// Endpoint para obtener una imagen aleatoria (filtrando solo las activas)
router.get('/challenge/image', imageController.getRandomImage);

module.exports = router;
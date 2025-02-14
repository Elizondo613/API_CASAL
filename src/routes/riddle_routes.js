const express = require('express');
const router = express.Router();
const riddleController = require('../controllers/riddle_controller');

// CRUD Endpoints
router.post('/riddle', riddleController.createRiddle); // Crear una nueva adivinanza
router.get('/riddle', riddleController.getAllRiddles); // Obtener todas las adivinanzas
router.get('/riddle/:id', riddleController.getRiddleById); // Obtener una adivinanza por ID
router.put('/riddle/:id', riddleController.updateRiddle); // Actualizar una adivinanza
router.delete('/riddle/:id', riddleController.deleteRiddle); // Eliminar una adivinanza

// Endpoint para obtener una adivinanza aleatoria (filtrando solo las activas)
router.get('/challenge/riddle', riddleController.getRandomRiddle);

module.exports = router;
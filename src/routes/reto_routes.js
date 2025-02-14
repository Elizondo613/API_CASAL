const express = require('express');
const router = express.Router();
const retoController = require('../controllers/reto_controller');

// CRUD Endpoints
router.post('/reto', retoController.createReto); // Crear un nuevo reto
router.get('/reto', retoController.getAllRetos); // Obtener todos los retos
router.get('/reto/:id', retoController.getRetoById); // Obtener un reto por ID
router.put('/reto/:id', retoController.updateReto); // Actualizar un reto
router.delete('/reto/:id', retoController.deleteReto); // Eliminar un reto

// Endpoint para obtener un reto aleatorio (filtrando solo los activos)
router.get('/challenge/retoRedes', retoController.getRandomRetoR);

module.exports = router;
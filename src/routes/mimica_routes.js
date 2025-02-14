const express = require('express');
const router = express.Router();
const mimicaController = require('../controllers/mimica_controller');

// CRUD Endpoints
router.post('/mimica', mimicaController.createMimica); // Crear un nuevo reto de mimica
router.get('/mimica', mimicaController.getAllMimicas); // Obtener todos los retos de mimica
router.get('/mimica/:id', mimicaController.getMimicaById); // Obtener un reto de mimica por ID
router.put('/mimica/:id', mimicaController.updateMimica); // Actualizar un reto de mimica
router.delete('/mimica/:id', mimicaController.deleteMimica); // Eliminar un reto de mimica

// Endpoint para obtener un reto de mimica aleatorio (filtrando solo los activos)
router.get('/challenge/mimica', mimicaController.getRandomMimica);

module.exports = router;
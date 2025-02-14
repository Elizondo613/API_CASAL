const express = require('express');
const router = express.Router();
const triviaController = require('../controllers/trivia_controller');

// CRUD Endpoints
router.post('/trivia', triviaController.createTrivia); // Crear una nueva trivia
router.get('/trivia', triviaController.getAllTrivias); // Obtener todas las trivias
router.get('/trivia/:id', triviaController.getTriviaById); // Obtener una trivia por ID
router.put('/trivia/:id', triviaController.updateTrivia); // Actualizar una trivia
router.delete('/trivia/:id', triviaController.deleteTrivia); // Eliminar una trivia

// Endpoint para obtener una trivia aleatoria (filtrando solo las activas)
router.get('/challenge/trivia', triviaController.getRandomTrivia);

// Endpoint para verificar la respuesta de una trivia
router.post('/verify-answer', triviaController.verifyAnswer);

module.exports = router;
const express = require('express');
const router = express.Router();
const triviaController = require('../controllers/trivia_controller');

router.get('/challenge/trivia', triviaController.getRandomTrivia);
router.post('/verify-answer', triviaController.verifyAnswer);

module.exports = router;
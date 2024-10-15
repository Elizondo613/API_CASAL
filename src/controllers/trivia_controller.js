const Trivia = require('../models/Trivia');

exports.getRandomTrivia = async (req, res) => {
  try {
    const trivia = await Trivia.aggregate([{ $sample: { size: 1 } }]);
    if (!trivia.length) {
      return res.status(404).json({ message: 'No se encontraron trivias' });
    }
    
    const { question, options, correctAnswer, _id } = trivia[0];
    res.json({ 
      question, 
      options, 
      correctAnswer, // Añadido este campo
      id: _id 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyAnswer = async (req, res) => {
  try {
    const { triviaId, selectedAnswer } = req.body;
    const trivia = await Trivia.findById(triviaId);
    
    if (!trivia) {
      return res.status(404).json({ message: 'Trivia no encontrada' });
    }
    
    const isCorrect = trivia.correctAnswer === selectedAnswer;
    res.json({
      correct: isCorrect,
      correctAnswer: trivia.correctAnswer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Trivia = require('../models/Trivia');

// 1. Crear una nueva trivia
exports.createTrivia = async (req, res) => {
  try {
    const { question, options, correctAnswer, category } = req.body;
    const newTrivia = new Trivia({ question, options, correctAnswer, category });
    await newTrivia.save();
    res.status(201).json({ message: 'Trivia creada correctamente', trivia: newTrivia });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Obtener todas las trivias
exports.getAllTrivias = async (req, res) => {
  try {
    const trivias = await Trivia.find();
    res.json(trivias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Obtener una trivia por ID
exports.getTriviaById = async (req, res) => {
  try {
    const { id } = req.params;
    const trivia = await Trivia.findById(id);
    if (!trivia) {
      return res.status(404).json({ message: 'Trivia no encontrada' });
    }
    res.json(trivia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Actualizar una trivia
exports.updateTrivia = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer, category, active } = req.body;
    const updatedTrivia = await Trivia.findByIdAndUpdate(
      id,
      { question, options, correctAnswer, category, active },
      { new: true }
    );
    if (!updatedTrivia) {
      return res.status(404).json({ message: 'Trivia no encontrada' });
    }
    res.json({ message: 'Trivia actualizada correctamente', trivia: updatedTrivia });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Eliminar una trivia
exports.deleteTrivia = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrivia = await Trivia.findByIdAndDelete(id);
    if (!deletedTrivia) {
      return res.status(404).json({ message: 'Trivia no encontrada' });
    }
    res.json({ message: 'Trivia eliminada correctamente', trivia: deletedTrivia });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Obtener una trivia aleatoria (filtrando solo las activas)
exports.getRandomTrivia = async (req, res) => {
  try {
    // Contar cuántas trivias activas hay
    const count = await Trivia.countDocuments({ active: true });

    if (count === 0) {
      return res.status(404).json({ message: 'No hay trivias activas disponibles' });
    }

    // Generar un índice aleatorio basado en el número de documentos
    const randomIndex = Math.floor(Math.random() * count);

    // Obtener una trivia aleatoria usando el índice generado
    const trivia = await Trivia.findOne({ active: true }).skip(randomIndex);

    if (!trivia) {
      return res.status(404).json({ message: 'No se encontraron trivias activas' });
    }

    // Devolver la trivia seleccionada
    const { question, options, correctAnswer, _id } = trivia;
    res.json({
      id: _id,
      question,
      options,
      correctAnswer // Añadido este campo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Verificar la respuesta de una trivia
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
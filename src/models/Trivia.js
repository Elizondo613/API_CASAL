const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'trivia',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arr => arr.length === 3, 'Debe tener exactamente 3 opciones']
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 2
  },
  category: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
});

module.exports = mongoose.model('Trivia', triviaSchema);
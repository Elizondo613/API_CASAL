const mongoose = require('mongoose');

const riddleSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'adivinanza',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Riddle', riddleSchema);
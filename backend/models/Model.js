const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: String,
  options: [{ type: String }],
  votes: { type: Object, default: {} }
});

module.exports = mongoose.model('Poll', pollSchema);
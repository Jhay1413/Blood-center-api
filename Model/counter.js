const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
  description: {
    required: true,
    trim: true,
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = Task

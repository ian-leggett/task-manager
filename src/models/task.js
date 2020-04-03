const mongoose = require('mongoose')
const validator = require('validator')

const TaskSchema = new mongoose.Schema({
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

TaskSchema.pre('save', async function(next) {
  const task = this
  console.log('Before saving task')
  next()
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task

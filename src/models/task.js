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
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
})


TaskSchema.set('toObject', { virtuals: true })

TaskSchema.pre('save', async function(next) {
  const task = this
  console.log('Before saving task')
  next()
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task

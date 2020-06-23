const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
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
  },{
    timestamps: true,
  }
)

TaskSchema.set('toObject', { virtuals: true })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task

const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('This password is not allowed')
      }
    },
  },
})

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

const newTask = new Task({
  description: 'mooooo',
  
})

newTask
  .save()
  .then(() => {
    console.log('Success')
  })
  .catch((err) => {
    console.log('Error is', err.message)
  })

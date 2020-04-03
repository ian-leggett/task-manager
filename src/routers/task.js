const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const { allowedUpdates } = require('../helpers')

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findById(_id)
    if (!task) {
      res.status(404).send()
    }
    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const isValidOperation = allowedUpdates(updates, ['description', 'completed'])
  
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    updates.forEach((update)=> task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      res.status(404).send()
    }
    return res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router

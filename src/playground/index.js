require('../db/mongoose')
const Task = require('../models/task')

const deleteTaskandCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}


deleteTaskandCount('5e76244b02de371266f9e829').then((count)=>{
    console.log(count)
})


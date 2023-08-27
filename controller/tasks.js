const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
        // res.status(200).json({ tasks, amount: tasks.length })
        // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } })
})

const createTask = asyncWrapper( async (req, res, next) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
})

const getSingleTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })

        if (!task) {
            // const error = new Error('Not Found')
            // error.status = 404
            // return next(error)
            return next(createCustomError(`No Task with ID : ${taskID}`, 404))
        }

        res.status(200).json({ task })
})

const deleteTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params
        const deleteTask = await Task.findOneAndDelete({ _id: taskID })

        if (!deleteTask) {
            return next(createCustomError('No task with id', 404))
            
        }
        // res.status(200).json({ deleteTask })
        res.status(200).json({ task: null, status: 'deleted'})
})

const updateTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params

        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return next(createCustomError('No task with id', 404))
            
        }

        res.status(200).json({task})
})

// const editTask = async(req, res) => {
//     try {
//         const { id: taskID } = req.params

//         const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true
//         })

//         if (!task) {
//             return res.status(404).json({msg: `No Task with ID : ${taskID}`})
//         }

//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({ msg: error })
        
//     }
// }


module.exports = { 
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}
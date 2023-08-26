const express = require('express')
const router = express.Router()
const { 
    tasks,
    createTask,
    getTask,
    task,
    deleteTask
} = require('../controller/tasks')

router.route('/').get(tasks).post(createTask)
router.route('/:id').get(getTask).patch(task).delete(deleteTask)


module.exports = router
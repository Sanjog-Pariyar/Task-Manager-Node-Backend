const express = require('express')
const app = express()
const tasks = require('./route/task')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

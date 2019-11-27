require('dotenv').config()

const express = require('express')
const { name, version } = require('./package.json')
const { argv: [, , port], env: { PORT = port || 8080, DB_URL } } = process
const cors = require('cors')
const { database } = require('tasks-data')

const { users, tasks } = require('./routes')

const api = express()

api.use(cors())

api.use('/users', users)
api.use('/tasks', tasks)

/*eslint no-console: "off"*/

database
    .connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))


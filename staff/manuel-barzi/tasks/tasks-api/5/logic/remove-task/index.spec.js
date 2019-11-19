require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const database = require('../../utils/database')
const removeTask = require('.')
const { random } = Math
require('../../utils/array-random')
const { NotFoundError, ConflictError } = require('../../utils/errors')

const { ObjectId } = database

describe('logic - remove task', () => {
    let client, users, tasks

    before(() => {
        client = database(DB_URL_TEST)

        return client.connect()
            .then(db => {
                users = db.collection('users')
                tasks = db.collection('tasks')
            })
    })

    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return Promise.all([users.deleteMany(), tasks.deleteMany()]) 
            .then(() => users.insertOne({ name, surname, email, username, password }))
            .then(({ insertedId }) => id = insertedId.toString())
            .then(() => {
                taskIds = []
                titles = []
                descriptions = []

                const insertions = []

                for (let i = 0; i < 10; i++) {
                    const task = {
                        user: ObjectId(id),
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }

                    insertions.push(tasks.insertOne(task)
                        .then(result => taskIds.push(result.insertedId.toString())))

                    titles.push(task.title)
                    descriptions.push(task.description)
                }

                for (let i = 0; i < 10; i++)
                    insertions.push(tasks.insertOne({
                        user: ObjectId(),
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }))

                return Promise.all(insertions)
            })
    })

    it('should succeed on correct user and task data', () => {
        const taskId = taskIds.random()

        return removeTask(id, taskId)
            .then(response => {
                expect(response).to.not.exist

                return tasks.findOne({ _id: ObjectId(taskId) })
            })
            .then(task => expect(task).to.not.exist)
    })

    it('should fail on unexisting user and correct task data', () => {
        const id = ObjectId().toString()
        const taskId = taskIds.random()

        return removeTask(id, taskId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${id} not found`)
            })
    })

    it('should fail on correct user and unexisting task data', () => {
        const taskId = ObjectId().toString()

        return removeTask(id, taskId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user does not have task with id ${taskId}`)
            })
    })

    it('should fail on correct user and wrong task data', () => {
        return tasks.findOne({ _id: { $nin: taskIds.map(taskId => ObjectId(taskId)) } })
            .then(({ _id }) => {
                const taskId = _id.toString()

                return removeTask(id, taskId)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(ConflictError)
                        expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
                    })
            })
    })

    // TODO other test cases

    after(() => Promise.all([users.deleteMany(), tasks.deleteMany()]).then(client.close))
})
require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const database = require('../../utils/database')
const modifyTask = require('.')
const { random } = Math
require('../../utils/array-random')
const { NotFoundError, ConflictError, ContentError } = require('../../utils/errors')

const { ObjectId } = database

describe('logic - modify task', () => {
    let client, users, tasks

    before(() => {
        client = database(DB_URL_TEST)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                users = db.collection('users')
                tasks = db.collection('tasks')
            })
    })

    const statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']
    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return users.insertOne({ name, surname, email, username, password })
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
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(response => {
                expect(response).to.not.exist

                return tasks.findOne({ _id: ObjectId(taskId) })
            })
            .then(task => {
                expect(task.user.toString()).to.equal(id)

                expect(task.title).to.exist
                expect(task.title).to.be.a('string')
                expect(task.title).to.have.length.greaterThan(0)
                expect(task.title).to.equal(newTitle)

                expect(task.description).to.exist
                expect(task.description).to.be.a('string')
                expect(task.description).to.have.length.greaterThan(0)
                expect(task.description).to.equal(newDescription)

                expect(task.status).to.exist
                expect(task.status).to.be.a('string')
                expect(task.status).to.have.length.greaterThan(0)
                expect(task.status).to.equal(newStatus)

                expect(task.date).to.exist
                expect(task.date).to.be.an.instanceOf(Date)

                expect(task.lastAccess).to.exist
                expect(task.lastAccess).to.be.an.instanceOf(Date)
            })
    })

    it('should succeed on correct user and new task data, except for title', () => {
        const taskId = taskIds.random()
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return tasks.findOne({ _id: ObjectId(taskId) })
            .then(({ title }) => {
                return modifyTask(id, taskId, undefined, newDescription, newStatus)
                    .then(response => {
                        expect(response).to.not.exist

                        return tasks.findOne({ _id: ObjectId(taskId) })
                    })
                    .then(task => {
                        expect(task.user.toString()).to.equal(id)

                        expect(task.title).to.exist
                        expect(task.title).to.be.a('string')
                        expect(task.title).to.have.length.greaterThan(0)
                        expect(task.title).to.equal(title)

                        expect(task.description).to.exist
                        expect(task.description).to.be.a('string')
                        expect(task.description).to.have.length.greaterThan(0)
                        expect(task.description).to.equal(newDescription)

                        expect(task.status).to.exist
                        expect(task.status).to.be.a('string')
                        expect(task.status).to.have.length.greaterThan(0)
                        expect(task.status).to.equal(newStatus)

                        expect(task.date).to.exist
                        expect(task.date).to.be.an.instanceOf(Date)

                        expect(task.lastAccess).to.exist
                        expect(task.lastAccess).to.be.an.instanceOf(Date)
                    })
            })
    })

    it('should succeed on correct user and new task data, except for description', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newStatus = statuses.random()

        return tasks.findOne({ _id: ObjectId(taskId) })
            .then(({ description }) => {
                return modifyTask(id, taskId, newTitle, undefined, newStatus)
                    .then(response => {
                        expect(response).to.not.exist

                        return tasks.findOne({ _id: ObjectId(taskId) })
                    })
                    .then(task => {
                        expect(task.user.toString()).to.equal(id)

                        expect(task.title).to.exist
                        expect(task.title).to.be.a('string')
                        expect(task.title).to.have.length.greaterThan(0)
                        expect(task.title).to.equal(newTitle)

                        expect(task.description).to.exist
                        expect(task.description).to.be.a('string')
                        expect(task.description).to.have.length.greaterThan(0)
                        expect(task.description).to.equal(description)

                        expect(task.status).to.exist
                        expect(task.status).to.be.a('string')
                        expect(task.status).to.have.length.greaterThan(0)
                        expect(task.status).to.equal(newStatus)

                        expect(task.date).to.exist
                        expect(task.date).to.be.an.instanceOf(Date)

                        expect(task.lastAccess).to.exist
                        expect(task.lastAccess).to.be.an.instanceOf(Date)
                    })
            })
    })

    it('should succeed on correct user and new task data, except for status', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`

        return tasks.findOne({ _id: ObjectId(taskId) })
            .then(({ status }) => {
                return modifyTask(id, taskId, newTitle, newDescription, undefined)
                    .then(response => {
                        expect(response).to.not.exist

                        return tasks.findOne({ _id: ObjectId(taskId) })
                    })
                    .then(task => {
                        expect(task.user.toString()).to.equal(id)

                        expect(task.title).to.exist
                        expect(task.title).to.be.a('string')
                        expect(task.title).to.have.length.greaterThan(0)
                        expect(task.title).to.equal(newTitle)

                        expect(task.description).to.exist
                        expect(task.description).to.be.a('string')
                        expect(task.description).to.have.length.greaterThan(0)
                        expect(task.description).to.equal(newDescription)

                        expect(task.status).to.exist
                        expect(task.status).to.be.a('string')
                        expect(task.status).to.have.length.greaterThan(0)
                        expect(task.status).to.equal(status)

                        expect(task.date).to.exist
                        expect(task.date).to.be.an.instanceOf(Date)

                        expect(task.lastAccess).to.exist
                        expect(task.lastAccess).to.be.an.instanceOf(Date)
                    })
            })
    })

    it('should fail on unexisting user and correct task data', () => {
        const id = ObjectId().toString()
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${id} not found`)
            })
    })

    it('should fail on correct user and unexisting task data', () => {
        const taskId = ObjectId().toString()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user does not have task with id ${taskId}`)
            })
    })

    it('should fail on correct user and wrong task data', () => {
        return tasks.findOne({ _id: { $nin: taskIds } })
            .then(({ _id }) => {
                const taskId = _id.toString()
                const newTitle = `new-title-${random()}`
                const newDescription = `new-description-${random()}`
                const newStatus = statuses.random()

                return modifyTask(id, taskId, newTitle, newDescription, newStatus)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.an.instanceOf(ConflictError)
                        expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
                    })
            })
    })

    it('should fail on correct user and wrong task status', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = 'wrong-status'

        expect(() => modifyTask(id, taskId, newTitle, newDescription, newStatus)).to.throw(ContentError, `${newStatus} does not match any of the valid status values: ${statuses}`)
    })

    // TODO other test cases

    after(() => client.close())
})
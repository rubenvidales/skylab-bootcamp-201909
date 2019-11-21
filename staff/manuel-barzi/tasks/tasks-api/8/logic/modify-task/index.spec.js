require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const modifyTask = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError, ContentError }, polyfills: { arrayRandom } } = require('tasks-util')
const { database, ObjectId, models: { User, Task } } = require('tasks-data')

arrayRandom()

describe('logic - modify task', () => {
    before(() => database.connect(TEST_DB_URL))

    const statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']
    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Task.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

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

            insertions.push(Task.create(task)
                .then(task => taskIds.push(task.id)))

            titles.push(task.title)
            descriptions.push(task.description)
        }

        for (let i = 0; i < 10; i++)
            insertions.push(Task.create({
                user: ObjectId(),
                title: `title-${random()}`,
                description: `description-${random()}`,
                status: 'REVIEW',
                date: new Date
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and task data', async () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        const response = await modifyTask(id, taskId, newTitle, newDescription, newStatus)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

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

    it('should succeed on correct user and new task data, except for title', async () => {
        const taskId = taskIds.random()
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        const { title } = await Task.findById(taskId)

        const response = await modifyTask(id, taskId, undefined, newDescription, newStatus)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

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

    it('should succeed on correct user and new task data, except for description', async () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newStatus = statuses.random()

        const { description } = await Task.findById(taskId)

        const response = await modifyTask(id, taskId, newTitle, undefined, newStatus)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

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

    it('should succeed on correct user and new task data, except for status', async () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`

        const { status } = await Task.findById(taskId)

        const response = await modifyTask(id, taskId, newTitle, newDescription, undefined)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

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

    it('should fail on unexisting user and correct task data', async () => {
        const id = ObjectId().toString()
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await modifyTask(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on correct user and unexisting task data', async () => {
        const taskId = ObjectId().toString()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await modifyTask(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user does not have task with id ${taskId}`)
        }
    })

    it('should fail on correct user and wrong task data', async () => {
        const { _id } = await Task.findOne({ _id: { $nin: taskIds.map(taskId => ObjectId(taskId)) } })

        const taskId = _id.toString()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await modifyTask(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
        }
    })

    it('should fail on correct user and wrong task status', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = 'wrong-status'

        expect(() => modifyTask(id, taskId, newTitle, newDescription, newStatus)).to.throw(ContentError, `${newStatus} does not match any of the valid status values: ${statuses}`)
    })

    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})

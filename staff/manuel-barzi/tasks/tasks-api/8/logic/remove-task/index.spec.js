require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const removeTask = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError }, polyfills: { arrayRandom } } = require('tasks-util')
const { database, ObjectId, models: { User, Task } } = require('tasks-data')

arrayRandom()

describe('logic - remove task', () => {
    before(() => database.connect(DB_URL_TEST))

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
                user: id,
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

        const response = await removeTask(id, taskId)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

        expect(task).to.not.exist
    })

    it('should fail on unexisting user and correct task data', async () => {
        const id = ObjectId().toString()
        const taskId = taskIds.random()

        try {
            await removeTask(id, taskId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on correct user and unexisting task data', async () => {
        const taskId = ObjectId().toString()

        try {
            await removeTask(id, taskId)

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

        try {
            await removeTask(id, taskId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
        }
    })

    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})
require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const listTasks = require('.')
const { random } = Math
const { database, ObjectId, models: { User, Task } } = require('tasks-data')

describe('logic - list tasks', () => {
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

            insertions.push(Task.create(task).then(task => taskIds.push(task.id)))

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
        const tasks = await listTasks(id)

        expect(tasks).to.exist
        expect(tasks).to.have.lengthOf(10)

        tasks.forEach(task => {
            expect(task.id).to.exist
            expect(task.id).to.be.a('string')
            expect(task.id).to.have.length.greaterThan(0)
            expect(task.id).be.oneOf(taskIds)

            expect(task.user).to.equal(id)

            expect(task.title).to.exist
            expect(task.title).to.be.a('string')
            expect(task.title).to.have.length.greaterThan(0)
            expect(task.title).be.oneOf(titles)

            expect(task.description).to.exist
            expect(task.description).to.be.a('string')
            expect(task.description).to.have.length.greaterThan(0)
            expect(task.description).be.oneOf(descriptions)

            expect(task.date).to.exist
            expect(task.date).to.be.an.instanceOf(Date)

            expect(task.lastAccess).to.exist
            expect(task.lastAccess).to.be.an.instanceOf(Date)
        })
    })

    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})
require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createTask = require('.')
const { random } = Math
const { database, models: { User, Task } } = require('tasks-data')

describe('logic - create task', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, email, username, password, title, description

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Task.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

        title = `title-${random()}`
        description = `description-${random()}`
    })

    it('should succeed on correct user and task data', async () => {
        const taskId = await createTask(id, title, description)

        expect(taskId).to.exist
        expect(taskId).to.be.a('string')
        expect(taskId).to.have.length.greaterThan(0)

        const task = await Task.findById(taskId)

        expect(task).to.exist
        expect(task.user.toString()).to.equal(id)
        expect(task.title).to.equal(title)
        expect(task.description).to.equal(description)
        expect(task.status).to.equal('TODO')
        expect(task.date).to.exist
        expect(task.date).to.be.instanceOf(Date)
    })

    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})
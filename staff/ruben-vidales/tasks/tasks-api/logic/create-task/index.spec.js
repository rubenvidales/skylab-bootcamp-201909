require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createTask = require('.')
const { random } = Math
const database = require('../../utils/database')
const { ObjectId } = database

describe('logic - create task', () => {
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

    let userId, name, surname, email, username, password, title, description

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return users.insertOne({ name, surname, email, username, password })
            .then(result => {
                userId = result.insertedId.toString()
                title = `title-${random()}`
                description = `description-${random()}`
            })
    })

    it('should succeed on correct user and task data', () =>
        createTask(userId, title, description)
            .then(taskId => {
                expect(taskId).to.exist
                expect(taskId).to.be.a('string')
                expect(taskId).to.have.length.greaterThan(0)

                return tasks.findOne({ _id: ObjectId(taskId)})
            })
            .then(task => {
                expect(task).to.exist
                expect(task.user.toString()).to.equal(userId)
                expect(task.title).to.equal(title)
                expect(task.description).to.equal(description)
                expect(task.status).to.equal('TODO')
                expect(task.date).to.exist
                expect(task.date).to.be.instanceOf(Date)
            })
    )

    it('should fail on incorrect user id, title or description data type', () => {
        expect(() => createTask(1)).to.throw(TypeError, '1 is not a string')
        expect(() => createTask(true)).to.throw(TypeError, 'true is not a string')
        expect(() => createTask([])).to.throw(TypeError, ' is not a string')
        expect(() => createTask({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createTask(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createTask(null)).to.throw(TypeError, 'null is not a string')

        expect(() => createTask('123456789',1)).to.throw(TypeError, '1 is not a string')
        expect(() => createTask('123456789',true)).to.throw(TypeError, 'true is not a string')
        expect(() => createTask('123456789',[])).to.throw(TypeError, ' is not a string')
        expect(() => createTask('123456789',{})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createTask('123456789',undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createTask('123456789',null)).to.throw(TypeError, 'null is not a string')

        expect(() => createTask('123456789','123456789',1)).to.throw(TypeError, '1 is not a string')
        expect(() => createTask('123456789','123456789',true)).to.throw(TypeError, 'true is not a string')
        expect(() => createTask('123456789','123456789',[])).to.throw(TypeError, ' is not a string')
        expect(() => createTask('123456789','123456789',{})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createTask('123456789','123456789',undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createTask('123456789','123456789',null)).to.throw(TypeError, 'null is not a string')
    })

    // TODO other test cases
    after(() => client.close())
})
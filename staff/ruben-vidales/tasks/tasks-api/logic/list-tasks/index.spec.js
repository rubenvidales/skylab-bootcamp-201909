require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const listTasks = require('.')
const { NotFoundError, ContentError } = require('../../utils/errors')
const { random } = Math
const database = require('../../utils/database')
const { ObjectId } = database

describe('logic - list tasks', () => {
    let client, users, tasks
    before(() => {
        client = database(DB_URL_TEST)

        return client.connect()
            .then(connection => {
                const db = connection.db()
                tasks = db.collection('tasks')
                users = db.collection('users')
            })
    })

    let name, surname, email, username, password, taskIds, titles, descriptions, userId

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return users.insertOne({ name, surname, email, username, password })
            .then(({ insertedId }) => userId = insertedId.toString())
            .then(() => {
                taskIds = []
                titles = []
                descriptions = []

                const insertions = []

                for (let i = 0; i < 5; i++) {
                    const task = {
                        user: ObjectId(userId),
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

                for (let i = 0; i < 5; i++)
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

    it('should succeed on correct user and task data', () =>
        listTasks(userId)
            .then(tasks => {
                expect(tasks).to.exist
                expect(tasks).to.have.lengthOf(5)

                tasks.forEach(task => {
                    expect(task.id).to.exist
                    expect(task.id).to.be.a('string')
                    expect(task.id).to.have.length.greaterThan(0)
                    expect(task.id).be.oneOf(taskIds)

                    expect(task.user).to.equal(userId)

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
    )

    it('should fail on incorrect user id', () => {
        const wrongId = '123456789012'
        return listTasks(wrongId)
            .then(result => {
                throw Error('should not reach this point')
                expect(result).to.be.an.instanceOf(NotFoundError)
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`User with id: ${wrongId} not found`)
            })

    })

    // TODO other test cases
    after(() => client.close())
})
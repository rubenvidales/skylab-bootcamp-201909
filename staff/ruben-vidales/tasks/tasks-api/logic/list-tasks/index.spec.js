require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const listTasks = require('.')
const { random } = Math
const uuid = require('uuid')
const database = require('../../utils/database')
const { ObjectId } = database

describe.only('logic - list tasks', () => {
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
            .then(result => {
                userId = result.insertedId.toString()

                taskIds = []
                titles = []
                descriptions = []

                for (let i = 0; i < 5; i++) {
                    const task = {
                        user: ObjectId(userId),
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }

                    tasks.insertOne(task)
                        .then(result => {
                            if (!result.insertedCount) throw new Error(`Failed to create task`)
                            taskIds.push(result.insertedId.toString())
                            titles.push(task.title)
                            descriptions.push(task.description)
                        })
                }
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

                    expect(task.id).to.exist
                    expect(task.id).to.be.a('string')
                    expect(task.id).to.have.length.greaterThan(0)
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

    // TODO other test cases
    after(() => client.close())
})
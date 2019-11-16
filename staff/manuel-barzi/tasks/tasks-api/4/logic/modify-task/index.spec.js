const { expect } = require('chai')
const users = require('../../data/users')('test')
const tasks = require('../../data/tasks')('test')
const modifyTask = require('.')
const { random } = Math
const uuid = require('uuid')
require('../../utils/array-random')
const { NotFoundError, ConflictError, ContentError } = require('../../utils/errors')

describe('logic - modify task', () => {
    before(() => Promise.all([users.load(), tasks.load()]))

    const statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']
    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(() => {
        id = uuid()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        users.data.push({ id, name, surname, email, username, password })

        taskIds = []
        titles = []
        descriptions = []

        for (let i = 0; i < 10; i++) {
            const task = {
                id: uuid(),
                user: id,
                title: `title-${random()}`,
                description: `description-${random()}`,
                status: statuses.random(),
                date: new Date
            }

            tasks.data.push(task)

            taskIds.push(task.id)
            titles.push(task.title)
            descriptions.push(task.description)
        }

        for (let i = 0; i < 10; i++)
            tasks.data.push({
                id: uuid(),
                user: uuid(),
                title: `title-${random()}`,
                description: `description-${random()}`,
                status: statuses.random(),
                date: new Date
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

                const task = tasks.data.find(({id}) => id === taskId)

                expect(task.user).to.equal(id)

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
        const title = tasks.data.find(({id}) => id === taskId).title
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, undefined, newDescription, newStatus)
            .then(response => {
                expect(response).to.not.exist

                const task = tasks.data.find(({id}) => id === taskId)

                expect(task.user).to.equal(id)

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

    it('should succeed on correct user and new task data, except for description', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const description = tasks.data.find(({id}) => id === taskId).description
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, undefined, newStatus)
            .then(response => {
                expect(response).to.not.exist

                const task = tasks.data.find(({id}) => id === taskId)

                expect(task.user).to.equal(id)

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

    it('should succeed on correct user and new task data, except for status', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const status = tasks.data.find(({id}) => id === taskId).status

        return modifyTask(id, taskId, newTitle, newDescription, undefined)
            .then(response => {
                expect(response).to.not.exist

                const task = tasks.data.find(({id}) => id === taskId)

                expect(task.user).to.equal(id)

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

    it('should fail on unexisting user and correct task data', () => {
        const id = uuid()
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(() => { throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${id} not found`)
            })
    })

    it('should fail on correct user and unexisting task data', () => {
        const taskId = uuid()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(() => { throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user does not have task with id ${taskId}`)
            })
    })

    it('should fail on correct user and wrong task data', () => {
        const taskId = tasks.data.find(task => task.user !== id).id
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        return modifyTask(id, taskId, newTitle, newDescription, newStatus)
            .then(() => { throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(ConflictError)
                expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
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
})
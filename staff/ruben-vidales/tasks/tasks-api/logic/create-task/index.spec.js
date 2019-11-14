const { expect } = require('chai')
const taks = require('../../data/tasks')('test')
const registerUser = require('.')
const { ContentError } = require('../../utils/errors')
const { random } = Math

describe('logic - create task', () => {
    before(() => tasks.load())

    let user, title, description, status

    beforeEach(() => {
        user = `user-${random()}`
        title = `title-${random()}`
        despription = `description-${random()}`
        status = `status-${random()}`
    })

    it('should succeed on correct credentials', () =>
        createTask(user, title, description, status)
            .then(taskId => {
                expect(taskId).to.exist
                expect(taskId).to.be.a('string')
                expect(taskId).to.have.length.greaterThan(0)

                const task = tasks.data.find(task => taskId === task)

                expect(task).to.exist
                expect(task.id).to.exist
                expect(task.id).to.be.a('string')
                expect(task.id).to.have.length.greaterThan(0)
                expect(task.title).to.exist
                expect(task.title).to.be.a('string')
                expect(task.title).to.have.length.greaterThan(0)
                expect(task.description).to.exist
                expect(task.description).to.be.a('string')
                expect(task.description).to.have.length.greaterThan(0)
                expect(task.description).to.exist
                expect(task.description).to.be.a('string')
                expect(task.description).to.have.length.greaterThan(0)


            })
    )
})
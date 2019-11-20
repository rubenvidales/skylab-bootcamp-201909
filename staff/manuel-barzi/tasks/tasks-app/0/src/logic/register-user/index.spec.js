import registerUser from '.'

const { random } = Math

describe('logic - register user', () => {
    let name, surname, email, username, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', () =>
        registerUser(name, surname, email, username, password)
            .then(response => {
                expect(response).toBeUndefined()
            })
    )

    it('should fail on trying to registering twice the same user data', () =>
        registerUser(name, surname, email, username, password)
            .then(response =>
                registerUser(name, surname, email, username, password)
            )
            .then(() => {
                throw Error('should not reach this point')
            })
            .catch(error => {
                debugger
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with username ${username} already exists`)
            })
    )
})
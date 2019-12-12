const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const retrieveUser = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, Player } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - retrieve user', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, currentEpisode, playlist, token

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        currentEpisode = {
            podcastId: '5dde31c43432f40aecd0e9f4',
            position: 1200,
            active: false
        }

        playlist = ['5dde31c43432f40aecd0e9f4', '5dde31c43432f40aecd0e9f5']

        await User.deleteMany()

        const user = new User({ name, surname, email, username, password })
        const player = new Player({ currentEpisode, playlist })

        user.player = player

        await user.save()

        id = user.id

        token = jwt.sign({ sub: id }, TEST_SECRET)
    })

    it('should succeed on correct user id', async () => {

        const user = await retrieveUser(token)

        expect(user).toBeDefined()
        expect(user.id).toEqual(id)
        expect(typeof user.id).toBe('string')
        expect(user._id).toBeUndefined
        expect(user.name).toEqual(name)
        expect(typeof user.name).toBe('string')
        expect(user.surname).toEqual(surname)
        expect(typeof user.surname).toBe('string')
        expect(user.email).toEqual(email)
        expect(typeof user.email).toBe('string')
        expect(user.username).toEqual(username)
        expect(typeof user.username).toBe('string')
        expect(user.password).toBeUndefined()
        expect(user.rssChannels).toBeType('array')
        expect(user.favs).toBeType('array')
    })

    it('should fail on wrong token', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(CredentialsError)
        }
    })

    afterAll(() => User.deleteMany().then(database.disconnect))
})
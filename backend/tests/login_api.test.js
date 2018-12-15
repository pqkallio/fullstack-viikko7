const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

describe('With at least one user in the database', async () => {
    const credentials = {
        username: 'testuser',
        password: 'TesTPassWorD',
    }

    beforeAll(async () => {
        await User.remove({})

        const user = new User({
            name: 'Test User',
            ...credentials,
            adult: false
        })

        await user.save()
    })

    test('login succeeds with valid username and password', async () => {
        const response = await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.token).not.toBeNull()
        expect(response.body.name).toEqual(user.name)
        expect(response.body.username).toEqual(user.username)
    })

    afterAll(async () => {
        await server.close()
    })
})
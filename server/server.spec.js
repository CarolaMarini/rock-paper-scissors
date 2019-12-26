const app = require('./index.js').getApp // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

describe('Server', () => {
    describe('GET /', () => {
        it('/ should return page', async () => {
            const res = await request.get('/')
            await expect(res.status).toBe(200)
        })
    })

    describe('GET /computerPlay', () => {
        it('should return random computer play', async () => {
            const res = await request.get('/computerPlay')
            await expect(res.status).toBe(200)
            await expect(res.text).toMatch(/rock|paper|scissors/)
        })
    })
})

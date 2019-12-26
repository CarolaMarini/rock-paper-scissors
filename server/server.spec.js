const app = require('./index.js').getApp // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

describe('Server', () => {
    describe('GET /', () => {
        it('should return page', async () => {
            const res = await request.get('/')
            await expect(res.status).toBe(200)
        });
    })
});

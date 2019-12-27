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
    describe('POST /rps', () => {
        describe('When P1 and P2 choose the same play', () => {
            let data = {
                p1play: "scissors",
                p2play: "scissors"
            }
            it('is a tie', async () => {
                const res = await request.post('/rps').send(data)
                await expect(res.text).toMatch('tie')
            })
        })
        describe('When P1 chooses scissors', () => {
            let data = { p1play: "scissors" }
            it('returns that P1 won if P2 chooses paper', async () => {
                data.p2play = "paper"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 1 won!')
            })
            it('returns P2 won if it chooses rock', async () => {
                data.p2play = "rock"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 2 won!')
            }
            )
        })
        describe('When P1 chooses paper', () => {
            let data = { p1play: "paper" }
            it('returns that P1 won if P2 chooses rock', async () => {
                data.p2play = "rock"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 1 won!')
            })
            it('returns P2 won if it chooses scissors', async () => {
                data.p2play = "scissors"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 2 won!')
            })
        })
        describe('When P1 chooses rock', () => {
            let data = { p1play: 'rock' }
            it('returns that P1 won if P2 chooses scissors', async () => {
                data.p2play = "scissors"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 1 won!')
            })
            it('returns P2 won if it chooses paper', async () => {
                data.p2play = "paper"
                const res = await request.post('/rps').send(data)
                expect(res.text).toMatch('Player 2 won!')
            })
        })

    })
})

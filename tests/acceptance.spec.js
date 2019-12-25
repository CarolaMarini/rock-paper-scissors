const server = require('../server')

describe('Rock paper scissors', () => {
    beforeAll(async () => {
        await server.start()
        await page.goto('http://localhost:3001')
    })

    describe('player vs computer', () => {
        it('Allows player to be human', async () => {
            const humanSelector = "#human"
            const humanOptsSelector = "#humanOpts"
            await expect(page.title()).resolves.toMatch('Rock Paper Scissors')
            await page.waitForSelector(humanSelector);
            await page.waitForSelector(humanOptsSelector, { visible: false })
            await page.click(humanSelector);
            await page.waitForSelector(humanOptsSelector, { visible: true })

        })
    })

    afterAll(async () => {
        await server.close()
    })
})
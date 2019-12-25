const server = require('../server')

describe('Rock paper scissors', () => {
    beforeAll(async () => {
        await server.start()
        await page.goto('http://localhost:3001');
    });
    describe('player vs computer', () => {
        it('Allows player to be human', async () => {
            await expect(page.title()).resolves.toMatch('Rock Paper Scissors')
            // click user
            // wait for 
        });
    })

});
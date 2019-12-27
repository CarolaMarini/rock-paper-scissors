const server = require('../server')

describe('Rock paper scissors', () => {
    beforeEach(async () => {
        await server.start()
        await page.goto('http://localhost:3001')
    })

    it('Renders correctly', async () => {
        await expect(page.title()).resolves.toMatch('Rock Paper Scissors')
    })

    describe('When playing as human', () => {

        async function isHidden(selector) {
            return await page.$eval(selector, (elem) => {
                return window.getComputedStyle(elem).getPropertyValue('display') == 'none'
            });
        }

        beforeEach(async () => {
            const humanSelector = '#human'
            const humanOptsSelector = '#humanOpts'
            await page.waitForSelector(humanSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
            await page.click(humanSelector);
            await expect(await isHidden(humanOptsSelector)).toBe(false)
        })

        it('Lets you choose rock', async () => {
            let rockSelector = '#rock'
            await page.click(rockSelector)
        })
        it('Lets you choose paper', async () => {
            let paperSelector = '#paper'
            await page.click(paperSelector)
        })
        it('Lets you choose scissors', async () => {
            let scissorsSelector = '#scissors'
            await page.click(scissorsSelector)
        })

        describe('When choosing scissors', () => {

            const scissorsSelector = '#scissors'
            const computerChoiceSelector = '#computerChoice'

            beforeEach(async () => await page.click(scissorsSelector))

            it('computes the winner', async () => {

                let computerChoiceElem = await expect(page).toMatchElement(computerChoiceSelector)
                const computerChoice = await (await computerChoiceElem.getProperty('textContent')).jsonValue()

                let gameResultElem = await expect(page).toMatchElement('#gameResult')
                let gameResult = await (await gameResultElem.getProperty('textContent')).jsonValue()


                switch (computerChoice) {
                    case 'scissors':
                        await expect(gameResult).toMatch('tie')
                        break
                    case 'rock':
                        await expect(gameResult).toMatch('Player 2 won!')
                        break
                    case 'paper':
                        await expect(gameResult).toMatch('Player 1 won!')
                }
            })
        })

    })

    afterEach(async () => {
        await server.close()
    })
})
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
            const humanSelector = "#human"
            const humanOptsSelector = "#humanOpts"
            await page.waitForSelector(humanSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
            await page.click(humanSelector);
            await expect(await isHidden(humanOptsSelector)).toBe(false)
        })

        it('Lets you choose rock', async () => {
            let rockSelector = "#rock"
            await page.click(rockSelector)
        })
        it('Lets you choose paper', async () => {
            let paperSelector = "#paper"
            await page.click(paperSelector)
        })
        it('Lets you choose scissors', async () => {
            let scissorsSelector = "#scissors"
            await page.click(scissorsSelector)
        })

        describe('When choosing scissors', () => {

            const scissorsSelector = "#scissors"
            const computerChoiceSelector = '#computerChoice'

            xit('recieves computer choice', async () => {
                await page.waitForSelector(computerChoiceSelector)
                await expect(page).toMatchElement(computerChoiceSelector)
                await expect(await isHidden(computerChoiceSelector)).toBe(true)
                await page.click(scissorsSelector);
                await expect(await isHidden(computerChoiceSelector)).toBe(false)
                let computerChoiceElem = await expect(page).toMatchElement(computerChoiceSelector)
                const text = await (await computerChoiceElem.getProperty('textContent')).jsonValue()
                await expect(text).toMatch(/rock|paper|scissors/)
                let gameResultElem = await expect(page).toMatchElement("#gameResult")
                let gameResult = await (await gameResultElem.getProperty('textContent')).jsonValue()
                switch (text) {
                    case "scissors":
                        await expect(gameResult).toMatch("tie")
                        break
                    case "rock":
                        await expect(gameResult).toMatch("Computer won :(")
                        break
                    case "paper":
                        await expect(gameResult).toMatch("You won!")
                }
            })
        })

    })

    afterEach(async () => {
        await server.close()
    })
})
const server = require('../server')

describe('Rock paper scissors', () => {
    beforeEach(async () => {
        await server.start()
        await page.goto('http://localhost:3001')
    })

    it('Renders correctly', async () => {
        await expect(page.title()).resolves.toMatch('Rock Paper Scissors')
    })

    describe('When player 1 is human', () => {

        const computerChoiceSelector = '#computerChoice'
        const humanOptsSelector = '#humanOpts'

        async function isHidden(selector) {
            return await page.$eval(selector, (elem) => {
                return window.getComputedStyle(elem).getPropertyValue('display') == 'none'
            });
        }

        beforeEach(async () => {
            const humanSelector = '#human'
            await page.waitForSelector(humanSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
            await page.click(humanSelector);
            await expect(await isHidden(humanOptsSelector)).toBe(false)
        })

        it('Lets you choose rock and hides options', async () => {
            let rockSelector = '#rock'
            await page.click(rockSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
        })
        it('Lets you choose paper and hides options', async () => {
            let paperSelector = '#paper'
            await page.click(paperSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
        })
        it('Lets you choose scissors and hides options', async () => {
            let scissorsSelector = '#scissors'
            await page.click(scissorsSelector)
            await expect(await isHidden(humanOptsSelector)).toBe(true)
        })

        describe('When choosing scissors', () => {

            const scissorsSelector = '#scissors'
            beforeEach(async () => await page.click(scissorsSelector))

            it('computes the winner', async () => {

                let computerChoiceElem = await expect(page).toMatchElement(computerChoiceSelector)
                let computerChoice = await (await computerChoiceElem.getProperty('textContent')).jsonValue()
                expect(computerChoice).not.toBe("")

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

        describe('When choosing rock', () => {

            const rockSelector = '#rock'
            beforeEach(async () => await page.click(rockSelector))

            it('computes the winner', async () => {

                let computerChoiceElem = await expect(page).toMatchElement(computerChoiceSelector)
                let computerChoice = await (await computerChoiceElem.getProperty('textContent')).jsonValue()
                expect(computerChoice).not.toBe("")

                let gameResultElem = await expect(page).toMatchElement('#gameResult')
                let gameResult = await (await gameResultElem.getProperty('textContent')).jsonValue()


                switch (computerChoice) {
                    case 'scissors':
                        await expect(gameResult).toMatch('Player 1 won')
                        break
                    case 'rock':
                        await expect(gameResult).toMatch('tie')
                        break
                    case 'paper':
                        await expect(gameResult).toMatch('Player 2 won')
                }
            })
        })
        describe('When choosing paper', () => {

            const paperSelector = '#paper'
            beforeEach(async () => await page.click(paperSelector))

            it('computes the winner', async () => {

                let computerChoiceElem = await expect(page).toMatchElement(computerChoiceSelector)
                let computerChoice = await (await computerChoiceElem.getProperty('textContent')).jsonValue()
                expect(computerChoice).not.toBe("")

                let gameResultElem = await expect(page).toMatchElement('#gameResult')
                let gameResult = await (await gameResultElem.getProperty('textContent')).jsonValue()


                switch (computerChoice) {
                    case 'scissors':
                        await expect(gameResult).toMatch('Player 2 won!')
                        break
                    case 'rock':
                        await expect(gameResult).toMatch('Player 1 won!')
                        break
                    case 'paper':
                        await expect(gameResult).toMatch('tie')
                }
            })
        })


    })

    describe('When player 1 is computer', () => {
        beforeEach(async () => {
            const computerSelector = '#computer'
            await expect(page).toClick(computerSelector)
        })

        it('Shows players choices and calculates winner', async () => {
            await expect(page).toMatchElement('#player1Choice', { text: /rock|paper|scissors/ })
            let gameResultElem = await expect(page).toMatchElement('#gameResult')
            let gameResult = await (await gameResultElem.getProperty('textContent')).jsonValue()
            await expect(gameResult).not.toBe("")
        })
    })

    afterEach(async () => {
        await server.close()
    })
})
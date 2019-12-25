it('jest setup', () => {
    expect(true).toBe(true)
});

describe('puppeteer setup', () => {
    it('should define page', async () => {
        await expect(page).not.toBeNull()
    });
});
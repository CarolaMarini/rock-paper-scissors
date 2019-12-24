test('jest setup', () => {
    expect(true).toBe(true)
});

test('puppeteer setup', () => {
    it('should define page', async () => {
        await expect(page).not.toBeNull()
    });
});
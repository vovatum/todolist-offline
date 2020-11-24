describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=additemform-stories--add-item-form-base-example');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('AppWithRedux', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=appwithredux-stories--app-with-redux-base-example');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('editablespan', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=editablespan-stories--editable-span-form-base-example');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('task', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=task-stories--task-base-example');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

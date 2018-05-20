const Categories = require('@resource-sentry/utils/lib/categories');

const Reader = require('../src/index');

describe('Reader', () => {

    let categories;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data/simple.json'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses text category', () => {
        expect(categories[Categories.TEXT]).toBeDefined();
    });

    it('uses value category', () => {
        expect(categories[Categories.VALUE]).toBeDefined();
    });

    it('extracts text property', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'myTitle', value: 'They Would Fly'});
    });

    it('extracts numeric property', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'myNumericValue', value: 8});
    });

    it('converts boolean', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'myState', value: 1});
    });

    it('converts null', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'awesomeMissedProperty', value: 'NULL'});
    });

    it('converts empty array', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'justEmpty', value: 'NULL'});
    });

});

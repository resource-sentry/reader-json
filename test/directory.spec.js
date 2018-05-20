const Categories = require('@resource-sentry/utils/lib/categories');

const Reader = require('../src/index');

describe('Directory', () => {

    let categories;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('extracts deep text', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'quiteHidden', value: 'yes, it is'});
    });

    it('extracts deep value', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'deepProperty', value: 8});
    });

    it('extracts simple text property', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'myTitle', value: 'They Would Fly'});
    });

});

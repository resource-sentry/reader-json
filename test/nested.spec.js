const Categories = require('@resource-sentry/utils/lib/categories');

const Reader = require('../src/index');

describe('Nested', () => {

    let categories;

    beforeAll(() => {
        let reader = new Reader({
            deep : 1,
            entry: './test/data/nested.json'
        });
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('finds zero tier', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'one', value: 1});
    });

    it('finds first tier', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'two_holder', value: 2})
    });

    it('ignores third tier', () => {
        expect(categories[Categories.VALUE]).not.toContainEqual({name: 'start_deeper_very-deep', value: 8});
        expect(categories[Categories.VALUE]).toHaveLength(2);
    });

});

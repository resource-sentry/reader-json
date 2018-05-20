const Categories = require('@resource-sentry/utils/lib/categories');

const Reader = require('../src/index');

describe('Order', () => {

    let categories;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data/order.json'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('sorts text category', () => {
        expect(categories[Categories.TEXT]).toEqual([
            {name: 'textA', value: 'one'},
            {name: 'textB', value: 'two'},
            {name: 'textC', value: 'three'},
            {name: 'textD', value: 'four'}
        ]);
    });

    it('sorts value category', () => {
        expect(categories[Categories.VALUE]).toEqual([
            {name: 'a', value: 1},
            {name: 'b', value: 2},
            {name: 'c', value: 3},
            {name: 'd', value: 4}
        ]);
    });

});

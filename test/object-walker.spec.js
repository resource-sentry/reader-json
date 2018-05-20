const ObjectWalker = require('../src/object-walker');

describe('Object Walker', () => {

    let walker;

    beforeEach(() => {
        walker = new ObjectWalker();
    });

    it('visits all properties', () => {
        expect(walker.setObject({a: 1, b: 2, c: 3}).getValues()).toHaveLength(3);
    });

    it('extracts property as a key', () => {
        expect(walker.setObject({alpha: 1}).getValues()).toContainEqual({key: 'alpha', value: 1});
    });

    it('includes parent in the key', () => {
        expect(walker.setObject({alpha: {beta: {gamma: 'some'}}}).getValues()).toContainEqual({
            key  : 'alpha_beta_gamma',
            value: 'some'
        });
    });

    it('ignores empty array', () => {
        expect(walker.setObject({a: []}).getValues()).toContainEqual({key: 'a', value: null});
    });

    it('visits only the first element of array', () => {
        let values = walker.setObject({a: [8, 800]}).getValues();
        expect(values).toContainEqual({key: 'a', value: 8});
        expect(values).toHaveLength(1);
    });

    it('prevents nested trees', () => {
        let values = new ObjectWalker(0).setObject({a: {deepA: 1}, b: 'theSecond'}).getValues();
        expect(values).toContainEqual({key: 'b', value: 'theSecond'});
        expect(values).toHaveLength(1);
    });

    it('prevents deeply nested trees', () => {
        let values = new ObjectWalker(1).setObject({
            a: 1,
            b: {deeperBe: {level3: 2}},
            c: {deeperCe: 3}
        }).getValues();
        expect(values).not.toContainEqual({key: 'b', value: 2});
        expect(values).toHaveLength(2);
    });

    it('makes environment reusable', () => {
        expect(walker.setObject({a: 1}).getValues()).toContainEqual({key: 'a', value: 1});
        expect(walker.setObject({b: 'two'}).getValues()).toContainEqual({key: 'b', value: 'two'});
    });

});

class ObjectWalker {
    constructor(limit = Number.MAX_SAFE_INTEGER) {
        this.values = [];
        this.depthLimit = limit;
    }

    getParentKey(parent, key) {
        let result = key;

        if (parent.length > 0) {
            result = parent + '_' + key;
        }

        return result;
    }

    getValues() {
        return this.values;
    }

    setObject(payload) {
        this.values.length = 0;
        this.visitProperties(payload, '', 0, this.depthLimit, this.values);
        return this;
    }

    /**
     * Recursively walks through Objects.
     *
     * @param {Object} data object to explore for the properties
     * @param {string} parentProperty current parent property name
     * @param {number} depth nesting level
     * @param {number} depthLimit max nesting level
     * @param {Array} result collection of objects with {key, value} properties
     */
    visitProperties(data, parentProperty, depth, depthLimit, result) {
        let parentKey, value;

        for (let key in data) {
            if (data.hasOwnProperty(key) === true) {
                value = data[key];

                // Work only with a first element in Array
                if (Array.isArray(value) === true) {
                    value = value.length === 0 ? null : value[0];
                }

                if (value !== null && typeof value === 'object') {
                    if ((depth + 1) <= depthLimit) {
                        parentKey = this.getParentKey(parentProperty, key);
                        this.visitProperties(value, parentKey, depth + 1, depthLimit, result);
                    }
                } else {
                    result.push({key: this.getParentKey(parentProperty, key), value});
                }
            }
        }
    }
}

module.exports = ObjectWalker;

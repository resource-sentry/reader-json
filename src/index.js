const BaseReader = require('@resource-sentry/utils/lib/base-reader'),
      Promise    = require('bluebird'),
      Categories = require('@resource-sentry/utils/lib/categories'),
      Logger     = require('@resource-sentry/utils/lib/logger'),
      path       = require('path');

const ConfigParameters = require('./model/config-parameters'),
      Constants        = require('./model/constants'),
      FileService      = require('./service/file-service'),
      ObjectWalker     = require('./object-walker');

class JsonReader extends BaseReader {
    constructor(config) {
        super();
        this.logger = Logger(this.constructor.name);
        this.config = config;
        this.fileService = new FileService();
    }

    getEntry() {
        return this.config[ConfigParameters.ENTRY];
    }

    scan() {
        return Promise
            .resolve()
            .then(() => this.fileService.getFiles(path.resolve(process.cwd(), this.getEntry())))
            .then(files => {
                let category;
                let objectWalker = new ObjectWalker(Constants.WALK_LIMIT);
                let values = [];

                this.logger.verbose(`Analyzing ${files.length} file(s)`);

                files.forEach(fileData => {
                    values = values.concat(objectWalker.setObject(fileData).getValues());
                });

                values.sort((left, right) => {
                    return left.key.localeCompare(right.key);
                });

                this.logger.verbose(`Extracted ${values.length} value(s)`);

                values.forEach(({key, value}) => {
                    // Convert Boolean to the 0 or 1 Number
                    if (typeof value === 'boolean') {
                        value = +value;
                    }

                    // Convert "null" to the "NULL" String
                    if (value === null) {
                        value = Constants.NULL_VALUE;
                    }

                    category = isNaN(value) === true ? Categories.TEXT : Categories.VALUE;
                    this.addValue(category, key, value);
                });

                this.dispatch(Constants.DATA_DID_CHANGE);
            });
    }
}

module.exports = JsonReader;

const BaseReader = require('@resource-sentry/utils/lib/base-reader'),
      Promise    = require('bluebird'),
      Logger     = require('@resource-sentry/utils/lib/logger'),
      path       = require('path');

const ConfigParameters = require('./model/config-parameters'),
      FileService      = require('./service/file-service');

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
                this.logger.verbose(`Analyzing ${files.length} file(s)`);
            });
    }
}

module.exports = JsonReader;

const Promise  = require('bluebird'),
      glob     = require('fast-glob'),
      fsNative = require('fs'),
      Logger   = require('@resource-sentry/utils/lib/logger'),
      path     = require('path');

const fs = Promise.promisifyAll(fsNative);

class FileService {
    constructor() {
        this.looger = Logger(this.constructor.name);
    }

    getPaths(filePath) {
        return Promise
            .resolve()
            .then(() => fs.statAsync(filePath))
            .then(fileStat => {
                if (fileStat.isFile() === true) {
                    return [filePath];
                } else if (fileStat.isDirectory() === true) {
                    return glob('**/*.json', {cwd: filePath})
                        .then(directoryFiles => {
                            return directoryFiles.map(relativePath => path.resolve(filePath, relativePath));
                        });
                } else {
                    this.logger.warn('Entry is unsupported. Please, provide path to a directory of JSON files or single JSON file.')
                    // Empty array by default
                    return [];
                }
            });
    }

    /**
     * Return collection of Objects.
     *
     * @param {string} filePath fully qualified path to the file or directory
     * @returns {PromiseLike<Array>}
     */
    getFiles(filePath) {
        // path.resolve(process.cwd(), this.getEntry())
        return Promise
            .resolve()
            .then(() => this.getPaths(filePath))
            .then(files => {
                return Promise.map(
                    files,
                    fileAbsolutePath => {
                        return fs.readFileAsync(fileAbsolutePath, 'utf8')
                            .then(content => JSON.parse(content));
                    });
            });
    }
}

module.exports = FileService;

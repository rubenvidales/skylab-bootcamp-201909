const fs = require('fs').promises
const validate = require('./validate')

class DataManager {
    constructor(path) {
        validate.string(path)
        validate.string.notVoid('path', path)

        this._path = path
    }

    load() {
        return this._data ? Promise.resolve() : fs.readFile(this._path)
            .then(json => JSON.parse(json))
            .then(_data => { this._data = _data })
    }

    persist() {
        return fs.writeFile(this._path, JSON.stringify(this._data, undefined, 4))
    }

    get data() {
        return this._data
    }
}

module.exports = DataManager
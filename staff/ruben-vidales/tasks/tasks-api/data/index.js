const mongoose = require('mongoose')

module.exports = {
    database: {
        connect(url) {
            mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        },
        disconnect() {
            mongoose.disconnect()
        }
    },
    models: require('./models')
}
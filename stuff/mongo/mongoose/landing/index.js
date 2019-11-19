const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/cats', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

const { ObjectId, Schema, model } = mongoose

// schemas

const sticker = new Schema({
    text: String
})

const person = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    stickers: {
        type: [sticker]
    }
})

const cat = new Schema({
    name: String,
    age: Number,
    owners: {
        type: [{
            type: ObjectId,
            ref: 'Person'
        }],
        required: true
    }
})

const passport = new Schema({
    country: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    person: { type: ObjectId, required: true }
})

// models

const Person = model('Person', person)

const Cat = model('Cat', cat)

const Sticker = model('Sticker', sticker)

const Passport = model('Passport', passport)

// demos

Promise.all([Person.deleteMany(), Cat.deleteMany(), Passport.deleteMany()])
    .then(() => Promise.all([Person.create({ name: 'Ruben', surname: 'Vidales', birthdate: new Date }), Person.create({ name: 'Hongda', surname: 'Vidales', birthdate: new Date })]))
    .then(([ruben, hongda]) => {
        return Cat.create({ name: 'Sucio' })
            .then(sucio => {
                sucio.age = 15

                sucio.owners.push(ruben._id, hongda._id)

                return sucio.save()
            })
            .then(() => {
                const sticker = new Sticker({ text: 'me gustan los mininos... mmmmmmu.... mu....' })

                ruben.stickers.push(sticker)

                return ruben.save()
            })
            .then(() => {
                const passport = new Passport({ country: 'Argentina', number: 'che-boludo-123', person: hongda._id })

                return passport.save()
            })
    })
    .then(() => mongoose.disconnect())

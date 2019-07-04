//pass: iHUfPcW3jG4SpuPt
//mongodb+srv://sergamar:<password>@fullstack-z5dso.mongodb.net/phonebook?retryWrites=true&w=majority

const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
    })

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]

const url = `mongodb+srv://sergamar:${password}@fullstack-z5dso.mongodb.net/test?retryWrites=true&w=majority`

switch (process.argv.length){
    case 3:
        mongoose.connect(url, {useNewUrlParser: true})
        console.log("phonebook:")
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name,  person.number)
            })
            mongoose.connection.close()
        })
        break
    case 5:
        mongoose.connect(url, {useNewUrlParser: true})
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
            id: Math.floor(Math.random()*99999999+1)
        })
        person.save().then(() => {
            mongoose.connection.close()
        })
        break
    default:
        console.log("Call with password to see all the numbers and with password, name and number to add a number.")

}
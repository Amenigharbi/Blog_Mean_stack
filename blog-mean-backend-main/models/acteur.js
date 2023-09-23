const mongoose = require('mongoose')


const Acteur= mongoose.model('Acteur' , {

    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    about: {
        type: String
    },
    image: {
        type: String
    }

})

module.exports = Acteur;
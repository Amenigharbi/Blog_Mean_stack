const mongoose = require('mongoose')

const film = mongoose.model('Film' , {

    title: {
        type: String
    },
    idActeur: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    tags: {
        type: Array
    }


})

module.exports = film;
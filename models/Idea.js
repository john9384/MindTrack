const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the Schema
const IdeaModel = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        requierd: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('ideas', IdeaModel);
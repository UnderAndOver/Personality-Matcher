const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true
    },
    questions: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        required: true
    },
    answers: [{
        domain: {
            type: String,
            required: true
        },
        facet: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
    }, ],
    timeElapsed: {
        type: Number,
        required: true
    },
    dateStamp: {
        type: Number,
        required: true
    },
});
module.exports = mongoose.model('Personality', PersonalitySchema, 'results');
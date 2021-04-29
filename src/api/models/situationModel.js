'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SituationSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    Updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Situations', SituationSchema);
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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

module.exports = mongoose.model('Registers', RegisterSchema);
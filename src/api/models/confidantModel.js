'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfidantSchema = new Schema({
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

const ConfidantRules = {
    name: 'required | string',
    phone: 'required | string',
}

module.exports = mongoose.model('Confidants', ConfidantSchema);
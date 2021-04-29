'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    address: {
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


module.exports = mongoose.model('Addresses', AddressSchema);
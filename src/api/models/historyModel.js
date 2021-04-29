'use strict';
const mongoose = require('mongoose'),
    Address = mongoose.model('Addresses'),
    Situation = mongoose.model('Situations');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    address: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Addresses' }],
        required: true
    },
    situation: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Situations' }],
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', HistorySchema);
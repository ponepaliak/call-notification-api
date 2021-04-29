'use strict';

const mongoose = require('mongoose'),
    History = mongoose.model('History'),
    HistoryRules = require('../rules/historyRules'),
    Validator = require('validatorjs');

exports.get_all = function(req, res) {
    res.status(200).json({
        success: true,
        data: [{
            address: "Lermontova 1",
            sum: "300",
        },
        {
            title: "Lermontova 2",
            sum: "325",
        }],
        error: ""
    });
};

exports.create_history_item = function(req, res) {
    let validator = new Validator(req.body, HistoryRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.get_history_item = function(req, res) {
    res.status(200).json({
        success: true,
        data: {
            address: "Lermontova 1",
            sum: "300",
        },
        error: ""
    })
};

exports.update_history_item = function(req, res) {
    let validator = new Validator(req.body, HistoryRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_history_item = function(req, res) {
    res.status(200).json({success: true});
};
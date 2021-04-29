'use strict';

const mongoose = require('mongoose'),
    Confidant = mongoose.model('Confidants'),
    ConfidantRules = require('../rules/confidantRules'),
    Validator = require('validatorjs');

exports.get_all = function(req, res) {
    res.status(200).json({
        success: true,
        data: [{
            name: "Vasia",
            phone: "00098778965",
        },
        {
            title: "Anton",
            phone: "00012379854",
        }],
        error: ""
    });
};

exports.create_confidant = function(req, res) {
    let validator = new Validator(req.body, ConfidantRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.get_confidant = function(req, res) {
    res.status(200).json({
        success: true,
        data: {
            name: "Vasia",
            phone: "00098778965",
        },
        error: ""
    });
};

exports.update_confidant = function(req, res) {
    let validator = new Validator(req.body, ConfidantRules.updateRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_confidant = function(req, res) {
    res.status(200).json({success: true});
};
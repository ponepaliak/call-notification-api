'use strict';

const mongoose = require('mongoose'),
    Contact = mongoose.model('Contacts'),
    ContactRules = require('../rules/contactRules'),
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

exports.create_contact = function(req, res) {
    let validator = new Validator(req.body, ContactRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.get_contact = function(req, res) {
    res.status(200).json({
        success: true,
        data: {
            name: "Vasia",
            phone: "00098778965",
        },
        error: ""
    });
};

exports.update_contact = function(req, res) {
    let validator = new Validator(req.body, ContactRules.updateRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_contact = function(req, res) {
    res.status(200).json({success: true});
};
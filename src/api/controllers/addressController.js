'use strict';

const mongoose = require('mongoose'),
    Address = mongoose.model('Addresses'),
    AddressRules = require('../rules/addressRules'),
    Validator = require('validatorjs');

exports.get_all = function(req, res) {
    res.status(200).json({
        success: true,
        data: [{
            title: "First",
            address: "Lermontova 1",
            error: ""
        },
        {
            title: "Second",
            address: "Lermontova 2",
            error: ""
        }]
    });
};

exports.create_address = function(req, res) {
    let validator = new Validator(req.body, AddressRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.get_address = function(req, res) {
    res.status(200).json({
        success: true,
        data: {
            title: "First",
            address: "Lermontova 1",
            error: ""
        }
    });
};

exports.update_address = function(req, res) {
    let validator = new Validator(req.body, AddressRules.updateRules);
    if (validator.errors) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_address = function(req, res) {
    res.status(200).json({success: true});
};
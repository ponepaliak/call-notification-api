'use strict';

const mongoose = require('mongoose'),
    Register = mongoose.model('Registers'),
    RegisterRules = require('../rules/registerRules'),
    Validator = require('validatorjs');

exports.get_all = function(req, res) {
    res.send("Get all registers");
};

exports.create_register = function(req, res) {
    let validator = new Validator(req.body, RegisterRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    const newRegister = new Register(req.body);

    newRegister.save(function(err, register) {
        if (err) res.send(err);
        res.json(register);
    });
};

exports.get_register = function(req, res) {
    res.send("get register");
};

exports.update_register = function(req, res) {
    let validator = new Validator(req.body, RegisterRules.updateRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_register = function(req, res) {
    res.status(200).json({success: true});
};
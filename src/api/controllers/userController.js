'use strict';
const config = require('dotenv').config().parsed;
const mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    UserRules = require('../rules/userRules'),
    Validator = require('validatorjs');

const bcrypt = require("bcryptjs");

const salt = config.SALT;

exports.get_all = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    let validator = new Validator(req.body, UserRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    const reqUser = req.body;
    reqUser.password = bcrypt.hashSync(reqUser.password, salt);
    const newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.get_user = function(req, res) {
    User.findById(req.query.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.get_contract_link = function (req, res) {
    User.findById(req.query.userId, function(err, user) {
        if (err)
            res.send(err);

        res.send(user.contract);
    });
}

exports.update_user = function(req, res) {
    let validator = new Validator(req.body, UserRules.updateRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    User.findOneAndUpdate({_id: req.query.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_user = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.status(200).json({success: true});
    });
};
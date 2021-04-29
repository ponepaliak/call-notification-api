'use strict';
const config = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');
const emailService = require('../service/sendEmail');

const mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    AuthRules = require('../rules/authRules'),
    Validator = require('validatorjs');

const bcrypt = require("bcryptjs");

const salt = config.SALT;

exports.login = function(req, res) {
    const reqUserData = req.body;

    let validator = new Validator(reqUserData, AuthRules.loginRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    console.log('request', reqUserData)
    User.findOne({email: reqUserData.email}, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
    });
}

exports.logout =  function (req, res) {
    res.status(200).json({success: true});
}

exports.send_auth_data = function (req, res) {
    const reqUserData = req.query;

    let validator = new Validator(reqUserData, AuthRules.sendAuthDataRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    console.log('method work')

    User.findOne({email: reqUserData.email}, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const code = getRandomInt(10000, 99999);

        const token = jwt.sign({ id: user._id, code }, config.SECRET, {
            expiresIn: 300
        });

        const messageText = `Secret code is ${code}`;
        const object = `Change the password on ${config.APP_NAME}`;

        try {
            emailService(reqUserData.email, object, messageText);
        } catch (e) {
            return res.status(500).send('Error on the server.');
        }

        res.status(200).send({ message: "Check you`r email", token: token});
    });
}

exports.generate_token_for_changing_password = function (req, res) {
    let validator = new Validator(req.body, AuthRules.generateTokenForChangingPasswordRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    const {token, code} = req.body;

    jwt.verify(token, config.SECRET, function(err, decoded) {
        if (decoded.code !== code) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: decoded.id, auth: true }, config.SECRET, {
            expiresIn: 300
        });

        res.json({token});
    });
}

exports.change_password = function (req, res) {
    let validator = new Validator(req.body, AuthRules.changePasswordRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    const {token, newPassword} = req.body;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.SECRET, function(err, decoded) {
        if (!decoded.auth) return res.status(401).send({ auth: false, token: null });
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        const password =  bcrypt.hashSync(newPassword, salt);

        User.updateOne({_id: decoded.id}, {password}, function (err, doc) {
            if (err) return res.status(500).send('Error on the server.');
            res.status(200).send({message: "Success"})
        })
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення

}
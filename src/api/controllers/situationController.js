'use strict';

const mongoose = require('mongoose'),
    Situation = mongoose.model('Situations'),
    SituationRules = require('../rules/situationRules'),
    Validator = require('validatorjs');

exports.get_all = function(req, res) {
    res.status(200).json({
        success: true,
        data: [{
            name: "Не могу выбрать, позвоните мне"
        },
        {
            name: "Прошел обыск в офисе"
        },
        {
            name: "Прошел обыск в офисе"
        },
        {
            name: "Произошло нападение"
        },
        {
            name: "Проверка на предприятии"
        },
        {
            name: "ЧП на предприятии"
        },
        {
            name: "Проблема с органами власти"
        },
        {
            name: "Конфликт с заказчиком / партнерами"
        }],
        error: ""
    });
};

exports.create_situation = function(req, res) {
    let validator = new Validator(req.body, SituationRules.addRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.get_situation = function(req, res) {
    res.status(200).json({
        success: true,
        data: {
            name: "Не могу выбрать, позвоните мне"
        },
        error: ""
    });
};

exports.update_situation = function(req, res) {
    let validator = new Validator(req.body, SituationRules.updateRules);
    if (validator.fails()) {
        return res.status(200).json({success: false});
    }

    res.status(200).json({success: true});
};

exports.delete_situation = function(req, res) {
    res.status(200).json({success: true});
};
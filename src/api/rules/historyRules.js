const AddressRules = require('../rules/addressRules');
const SituationRules = require('../rules/situationRules');

exports.addRules = {
    price: 'required|numeric',
    address: AddressRules,
    situation: SituationRules,
}

exports.updateRules = {
    price: 'required|numeric',
    address: AddressRules,
    situation: SituationRules,
}


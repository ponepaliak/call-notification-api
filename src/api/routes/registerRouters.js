'use strict';

module.exports = function(app) {
    const registers = require('../controllers/registerController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    app.route('/register/:registerId')
        .get(registers.get_register)
        .put(registers.update_register)
        .delete(registers.delete_register);

    app.route('/register')
        .get(registers.get_all)
        .post(registers.create_register);
};

'use strict';
const sessionMiddleware = require("../middleware/sessionMiddleware");

module.exports = function(app) {
    const users = require('../controllers/userController');

    app.use('/users', sessionMiddleware);

    app.route('/users/:userId')
        .get(users.get_user)
        .put(users.update_user)
        .delete(users.delete_user);

    app.route('/users/:userId/contract')
        .get(users.get_contract_link)

    app.route('/users')
        .get(users.get_all)
        .post(users.create_user);
};

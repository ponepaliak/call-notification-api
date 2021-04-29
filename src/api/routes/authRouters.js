'use strict';

module.exports = function(app) {
    const auth = require('../controllers/authController');

    app.route('/login').post(auth.login);

    app.route('/logout').post(auth.logout);

    app.route('/change-password')
        .put(auth.change_password)
        .post(auth.generate_token_for_changing_password)
        .get(auth.send_auth_data)

};

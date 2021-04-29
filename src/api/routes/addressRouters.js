'use strict';

module.exports = function(app) {
    const addresses = require('../controllers/addressController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    // app.use('/addresses', sessionMiddleware);

    app.route('/addresses/:addressId')
        .get(addresses.get_address)
        .put(addresses.update_address)
        .delete(addresses.delete_address);

    app.route('/addresses')
        .get(addresses.get_all)
        .post(addresses.create_address);
};

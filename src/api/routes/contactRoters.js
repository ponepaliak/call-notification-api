'use strict';

module.exports = function(app) {
    const contacts = require('../controllers/contactController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    app.use('/contacts', sessionMiddleware);

    app.route('/contacts/:contactId')
        .get(contacts.get_contact )
        .put(contacts.update_contact)
        .delete(contacts.delete_contact);

    app.route('/contacts')
        .get(contacts.get_all)
        .post(contacts.create_contact);
};

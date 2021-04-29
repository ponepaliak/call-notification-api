'use strict';

module.exports = function(app) {
    const situations = require('../controllers/situationController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    app.use('/situations', sessionMiddleware);

    app.route('/situations/:situationId')
        .get(situations.get_situation)
        .put(situations.update_situation)
        .delete(situations.delete_situation);

    app.route('/situations')
        .get(situations.get_all)
        .post(situations.create_situation);
};

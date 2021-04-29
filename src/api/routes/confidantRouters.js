'use strict';

module.exports = function(app) {
    const confidants = require('../controllers/confidantController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    app.use('/confidants', sessionMiddleware);

    app.route('/confidants/:confidantId')
        .get(confidants.get_confidant)
        .put(confidants.update_confidant)
        .delete(confidants.delete_confidant);

    app.route('/confidants')
        .get(confidants.get_all)
        .post(confidants.create_confidant);
};

'use strict';

module.exports = function(app) {
    const history = require('../controllers/historyController');
    const sessionMiddleware = require("../middleware/sessionMiddleware");

    app.use('/history', sessionMiddleware);

    app.route('/history/:historyItemId')
        .get(history.get_history_item)
        .put(history.update_history_item)
        .delete(history.delete_history_item);

    app.route('/history')
        .get(history.get_all)
        .post(history.create_history_item);
};

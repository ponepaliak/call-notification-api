const express = require('express'),
    config = require('dotenv').config().parsed,
    app = express(),
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    Situation = require('./api/models/situationModel'),
    Confidant = require('./api/models/confidantModel'),
    Address = require('./api/models/addressModel'),
    Contact = require('./api/models/contactModel'),
    Register = require('./api/models/registerModel'),
    History = require('./api/models/historyModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_HOST,{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./api/routes/userRoutes');
const authRoutes = require('./api/routes/authRouters');
const situationRouters = require('./api/routes/situationRouters');
const confidantRouters = require('./api/routes/confidantRouters');
const addressRouters = require('./api/routes/addressRouters');
const contactRouters = require('./api/routes/contactRoters');
const registerRouters = require('./api/routes/registerRouters');
const historyRouters = require('./api/routes/historyRouters');

userRoutes(app);
authRoutes(app);
situationRouters(app);
confidantRouters(app);
addressRouters(app);
contactRouters(app);
registerRouters(app);
historyRouters(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(config.PORT);

console.log('todo list RESTfull API server started . on: ' + config.PORT);


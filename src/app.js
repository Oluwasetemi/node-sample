const fs = require('fs');
const path = require('path');
require('dotenv').config();
// const io = require('socket.io')
// const morgan = require('morgan');
const express = require('express');

const routes = require('../src/routes');
const logger = require('./utils/logger');
const errorHandlers = require('./utils/errorhandler');

if (!fs.existsSync('./public/')) {
    fs.mkdir('./public/', err => {
        if (err) {
            return logger.info('failed to write directory', err);
        }
        return null;
    });
}

const app = express();

// Parse the payload and add to request.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup morgan dev
// app.use(morgan('dev'));

// Attach all the database models to here
app.use((req, res, next) => {
    req.log = logger.log;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// All route should be added to the index.js file inside the route folder
app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
const server = app.listen(process.env.PORT);
//  Start socketIo
// new Socket(io(server)).startSocket()

// Handle the error
app.use((err, req, res, next) => {
    req.log(err.message);
    logger.error(err.message);
    next(err);
});

// set the env to production for error handling
app.set('env', 'development');

app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

logger.log(`\nListening @ port http://localhost:${process.env.PORT}`);

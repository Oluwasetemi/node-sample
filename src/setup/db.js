/* eslint-disable no-console */
const mongoose = require('mongoose');

//setup database

mongoose.Promise = global.Promise;
// Connecting to the database
const connection = () =>
    mongoose
        .connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.info('INFO - Successfully connected to the database');
        })
        .catch(err => {
            console.error(
                'FIX - Could not connect to the database. Exiting now...',
                err,
            );
            throw err;
        });

module.exports = connection;

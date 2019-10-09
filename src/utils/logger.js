/* eslint-disable no-console */
const log = (value, type) => {
    if (process.env.DEBUG) {
        return `${new Date().toGMTString()} [${type}]: ${value}`;
    }
    return '';
};

module.exports = {
    info: value => {
        if (process.env.DEBUG === 'true') {
            console.info(log(value, 'INFO'));
        }
    },
    error: value => {
        if (process.env.DEBUG === 'true') {
            console.error(log(value, 'ERROR'));
        }
    },
    log: value => {
        if (process.env.DEBUG === 'true') {
            console.log(log(value, 'LOG'));
        }
    },
};

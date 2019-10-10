const express = require('express');

// import controllers and external dependencies
const exampleController = require('../controllers/exampleController');

// eslint-disable-next-line babel/new-cap
const router = express.Router();

// example route
router.get('/test', (req, res) => {
    res.status(200).json({ hello: 'world' });
});

// example route with controllers and middleware
router.get('/hello', exampleController.hello);

module.exports = router;

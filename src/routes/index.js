const express = require('express');

// eslint-disable-next-line babel/new-cap
const router = express.Router();

router.get('/test', (req, res) => {
    res.status(200).json({ hello: 'world' });
});

module.exports = router;

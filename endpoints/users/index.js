const router = require('express').Router();

const listUsers = require('./list');

router.get('/users', listUsers);

module.exports = router;

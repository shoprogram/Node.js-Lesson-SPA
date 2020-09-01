const express = require('express');
const router = express.Router();
const login = require('./login.js');
const todo = require('./todo.js');
const user = require('./user.js');

router.use('/', login)
      .use('/todo', todo)
      .use('/user', user);

module.exports = router;

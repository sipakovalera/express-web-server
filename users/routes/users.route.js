const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middlewars');

router
  .get('/', auth, controller.get )
  .post('/', controller.add )
  .delete('/:id', controller.delete)
  .put('/:id', controller.update)
  .post('/login', controller.login)
  .post('/register', controller.register)
  
module.exports = router;

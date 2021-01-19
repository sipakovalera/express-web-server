const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middlewars');

router
  .get('/',controller.get )
  .post('/register', controller.add )
  .delete('/:id', controller.delete)
  .put('/:id', auth, controller.update)
  .post('/login', controller.login);
  
module.exports = router;

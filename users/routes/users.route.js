const express = require('express');
const router = express.Router();
const { createUser, getUsers, readUser, deleteUser, updateUser } = require("../controllers/users.controller");

router
  .get('/', getUsers )
  .post('/', createUser)
  .get('/:id', createUser)
  .delete('/:id', deleteUser)
  .patch('/:id', updateUser);

module.exports = router;

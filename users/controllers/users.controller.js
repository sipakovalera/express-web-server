let users = require("../services/users.service");

const getUsers = (req, res) => {
  res.send(users);
};

 const createUser = (req, res) => {
  const user = req.body;
  users.push({...user});
  res.send(`User with ${user.firstName} added to database`);
};

const readUser = (req, res) => {
  const id = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.end(foundUser);
};

const deleteUser =  (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`User with ${id} deleted from database`)
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const {firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;
  res.send(`User with ${id} has been updated`);
};

module.exports = { getUsers, createUser, readUser, deleteUser, updateUser };

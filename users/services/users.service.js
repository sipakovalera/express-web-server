const fs = require('fs');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../config/key');

//load all users
const loadJSON = (filename = '') => {
  return JSON.parse(fs.existsSync(filename) ? 
  fs.readFileSync(filename).toString() 
  : '""' )};
const data = loadJSON('users.json');

//save users 
const saveJSON = (filename = '', json = '""') => {
  return fs.writeFile(filename, JSON.stringify(json), (err) => {
    if(err){
      console.log("Async recording completed");
    } else {
      const newData = fs.readFileSync("users.json", "utf8");
      console.log(newData);
    }
  }
   )};

const generatedToken = (user) => {
  const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    return user.password = hash;
}

class UsersService {

  getUsers = () => {
    return data;
  }

  addUser = (user) => {
    user.id = Date.now();
    generatedToken(user);
    data.push(user);
    return saveJSON('users.json', data); 
  }

  updateUser = (updateUser, id) => {
    const index = data.findIndex(user => Number(user.id) === Number(id));
    generatedToken(updateUser);
      data[index] = {
          ...data[index],
          ...updateUser
      }    
        return saveJSON('users.json', data);
  }

  deleteUser = (id) => {
    const index = data.findIndex(user => user.id === id);
    data.splice(index, 1);
    return saveJSON('users.json', data);
  }

  loginUser = (login, password) => {
    const user = data.find(user => user.login === login);
      if (!user){
        console.log(`${user} not found`); 
      } else {
        const passwordByUser = bcrypt.compareSync(password, user.password);
          if(passwordByUser){
            const token = jwt.sign({
              login: user.login,
              id: user.id
            }, secret, {expiresIn: 60 * 60 })
              return ({token, user});
          } else {
              console.log('Invalid password');
          }
      }  
  }
};

module.exports = new UsersService();

const fs = require('fs');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../config/key');

//load all users
const loadJSON = (filename = '') => {
  return JSON.parse(fs.existsSync(filename) ? 
  fs.readFileSync(filename).toString() : '""' )};
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

class UsersService {

  getUsers = () => {
    return data;
  }

  addUser = async (user) => {
    user.id = Date.now();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    data.push(user);
    return saveJSON('users.json', data); 
  }

  updateUser = (updateUser, id) => {
    const index = data.findIndex(updateUser => Number(updateUser.id) === Number(id));
    const {login, name, password } = updateUser;
      if(name){
        console.log('Name is changed')
      } if(login){
        console.log('Login is changed')
      } if(password){
        console.log('Password is changed')
      } 
    
    data[index] = {...data[index],...updateUser}    
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
        console.log(`${user} is not found`); 
      } else {
        const passwordByUser = bcrypt.compareSync(password, user.password);
          if(passwordByUser){
            const token = jwt.sign({
              id: user.id
            }, secret, {expiresIn: '12.5hrs' })
              return ({token, user});
          } else {
              console.log('Invalid password');
          }
      }  
  }
};


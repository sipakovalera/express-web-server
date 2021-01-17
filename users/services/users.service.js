const fs = require('fs');

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
      console.log("Асинхронная запись файла завершена");
    } else {
      const newData = fs.readFileSync("users.json", "utf8");
      console.log(newData);
    }
  }
   )};

class UsersService {

  getUsers = () => {;
    return data;
  }

  addUser = (user) => {
    user.id = Date.now();
    data.push(user);
    return saveJSON('users.json', data); 
  }

  updateUser = (updateUser, id) => {
    const index = data.findIndex(user => user.id === id);
      data[index] = {
          ...data[index],
          ...updateUser
      }    
        return saveJSON('users.json', data);;
  }

  deleteUser = (id) => {
    const index = data.findIndex(user => user.id === id);
    data.splice(index, 1);
    return saveJSON('users.json', data);
  }
};


module.exports = new UsersService();

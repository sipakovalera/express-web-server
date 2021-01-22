const fs = require('fs');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secret} = require('../config/key');
const User = require('../models/User');
class UsersService {

  get = async() => {
    return await User.findAll();
  }

  add = async(user) => {
    const salt = await bcrypt.genSalt(10);
    console.log(user);
    return await User.create({
      id: user.id,
      name: user.name,
      login: user.login,
      password:await bcrypt.hash(user.password, salt)
    })
  }

  update = async (updateUser, id) => {
    const {login, name, password } = updateUser;
      if(name){
        updateUser = await User.update({name: name}, {
             where: {
               id: id
            }
          });
        console.log('You changed NAME');
        return updateUser;

      } if(login){
        updateUser = await User.update({login: login}, {
           where: {
             id: id
          }
        });
        console.log('You changed LOGIN');
        return updateUser;

      } if(password){
        const salt = await bcrypt.genSalt(10);
        console.log('You changed PASSWORD');
        updateUser = await User.update({ 
          password: await bcrypt.hash(password, salt)}, {
            where: {
              id: id
            }
          });
        return updateUser;
      } 
  }

  delete = async(id) => {
    return await User.destroy({
      where: {
        id: id
      }
    })
  }

  login = async (login, password) => {
    const user = await User.findOne({where:{ login: login }});
      if (!user){
        console.log(`${user} is not found`); 
      } else {
        const passwordByUser = await bcrypt.compare(password, user.password);
          if(passwordByUser){
            const token = jwt.sign({
              id: user.id,
              login: user.login,
              name: user.name           
            }, secret, {expiresIn: '12.5hrs' });
              console.log(token);
              return ({token, user});
          } else {
              console.log('Invalid password');
          }
      }  
  }
};

module.exports = new UsersService();

const usersService = require('../services/users.service');
class UsersController {
  service = usersService;

  get = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.getUsers());
  };

  add = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.addUser(req.body));
  };

  update = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.updateUser(req.body, req.params.id));
  }; 

  delete = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.deleteUser(req.params.id));
  };

  login = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.loginUser(req.body.login, req.body.password));
  };

  register = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.registerUser(req.body.login, req.body.password));
  };  
}

module.exports = new UsersController();

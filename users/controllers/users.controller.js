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
}

module.exports = new UsersController();

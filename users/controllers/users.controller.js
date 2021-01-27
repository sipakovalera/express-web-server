const usersService = require('../services/users.service');
class UsersController {
  service = usersService;

  get = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.get());
  };

  add = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.add(req.body, req.file));
  };

  update = ( req, res, next ) => {
    res
      .status(200)
      .send(this.service.update(req.body, req.params.id));
  }; 

  delete = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.delete(req.params.id));
  };

  login = (req, res, next ) => {
    res
      .status(200)
      .send(this.service.login(req.body.login, req.body.password));
  };
  
}

module.exports = new UsersController();

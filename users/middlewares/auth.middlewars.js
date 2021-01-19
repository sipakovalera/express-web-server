const jwt = require('jsonwebtoken');

const auth = (tokenType) => (req, res, next) => {
  try{
    const [strategy, token] = req.headers['autorization'].split('');
    const result = jwt.verify(token, 'secret');
    //dbStorage
    //const user = await dbStorage.findByLogin(login)
    req.user = user;
    next(); 
  } catch (e) {
    res.status(401).send(e.message)
  };
};


module.exports = auth; 

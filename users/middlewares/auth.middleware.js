const jwt = require('jsonwebtoken');
const { secret } = require('../config/key');

const auth = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]; 
    if(!req.user){
      return res.status(401).json({
        message: 'Invalid token'
      })
    }

    const decodeData = jwt.verify(token, secret);
      req.user = decodeData;
      next(); 
  } catch (e) {
    res
      .status(401)
      .json({
        message: 'Login in, please'
      })
  };
};


module.exports = auth; 

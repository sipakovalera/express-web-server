const jwt = require('jsonwebtoken');
const { secret } = require('../config/key');

const auth = (req, res, next) => {
  try{
    const token = req.headers.autorization.split(' ')[1];
    if(!token){
      return res.status(403).json({
        message: 'User is not autorized'
      })
    }
    const decodeData = jwt.verify(token, secret);
    req.user = decodeData;
    next(); 
  } catch (e) {
    res
      .status(401)
      .json({
        message: 'User is not autorized'
      })
  };
};


module.exports = auth; 

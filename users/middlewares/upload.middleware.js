const path = require('path');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, './upload/'));
  },
  filename: (req, file, cb) =>{
      cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  
  if(file.mimetype === "avatar/png" || 
    file.mimetype === "avatar/jpg"|| 
    file.mimetype === "avatar/jpeg"){
      cb(null, true);
  }
  else{
      cb(null, false);
  }
};

const upload = multer({storage: fileStorage, fileFilter});

module.exports = upload;

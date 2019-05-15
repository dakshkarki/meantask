let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let users_controller = require('../routes-controller/users-controller');
const bodyParser = require('body-parser');

const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});


const DIR = './uploads';
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Respond with a resource');
});

// router.get('/getallusers',users_controller.getAllUsers);




router.post('/signup',users_controller.signUp);

router.post('/signin',users_controller.signIn);

router.post('/forgotpassword',users_controller.forgotPassword);

router.get('/verifyaccount',users_controller.verifyAccount);

router.post('/setpassword',users_controller.setPassword);

router.post('/postsetpassword',users_controller.postSetPassword);

router.get('/findAllUser',users_controller.findAllUser);

router.get('/myprofile',auth,users_controller.getMyProfile);

router.post('/edituser',upload.single('photo'),auth,users_controller.editUser);

router.delete('/deleteUser', users_controller.deleteUser);


module.exports = router;

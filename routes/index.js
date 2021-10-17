var express = require('express');
var router = express.Router();
const user = require("../controllers/userController.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', user.createUser)


router.post('/login', user.login)

router.get('/login', user.logout)
module.exports = router;


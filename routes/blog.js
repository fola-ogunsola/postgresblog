var express = require('express');
var router = express.Router();

const blog = require("../controllers/blogController.js");
var verifyToken = require('../middleware/token');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/auth/create', verifyToken, blog.createBlog)

router.get('/blog', blog.readAllBlog)

router.get('/blog/:id', blog.readOneBlog)

router.put('/blog/:id',verifyToken, blog.updateOne)

router.delete('/blog/:id',verifyToken, blog.deleteBlog);


module.exports = router;

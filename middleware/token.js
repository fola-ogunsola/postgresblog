const jwt = require('jsonwebtoken');
const auth = require('../config');

function verifyToken(req, res, next){
    console.log(req.headers, 'header');

    var token = req.headers['x-access-token'];
    if(!token){
        res.status(401).send({auth: false, message: "No token provided"})
    } else {
        jwt.verify(token,auth.secret, function(err, decoded){
            if(err){
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'})
            } else {
              req.id = decoded.id;
              next()
            }
        })
    }
}

module.exports = verifyToken;
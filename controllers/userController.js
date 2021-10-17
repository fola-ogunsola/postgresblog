const bcrypt = require('bcrypt');
const { FailedDependency } = require('http-errors');
const jwt = require('jsonwebtoken');
const { result } = require('../config/db.config');
const db = require('../config/db.config');
const salt = bcrypt.genSaltSync(10);
const auth = require('../config');


function createUser (req, res){
    var hash = bcrypt.hashSync(req.body.password, salt);
    db.any('INSERT INTO users(id, first_name, last_name, email, password) VALUES($1, $2, $3, $4 , $5)', [ req.body.id, req.body.first_name, req.body.last_name,  req.body.email, hash])
    .then(function(data){
        data = req.body;
        return res.status(200).json({message: "Account created, login!", data});
    })
    .catch(function(error){
        return res.status(200).json({message: "Error registering"});
    })
}

function login(req, res){
    var email=req.body.email;
    var password=req.body.password;
    db.oneOrNone('SELECT * FROM users WHERE email = $1',[email])
    .then(function(result){
        bcrypt.compare(password, result.password)
        .then(function(ress){
            if(!ress){
                return res.json({
                    status:false,                  
                    message:"Email and password does not match"
                })
            }else{
                var token = jwt.sign({email: ress.email}, auth.secret, {
                    expiresIn: 86400
                })
                res.json({message: "Welcome", token: token})
            }
        })
    })
    .catch(function(error){
        return res.json({
            status:false,
            message:"Server Error"
        })
    })
}

function logout (req, res) {
    return  res.json({message: "Goodbye"})
   }
module.exports = {createUser, login, logout};


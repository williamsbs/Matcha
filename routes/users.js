const express = require('express');
const md5 = require('md5');
const microtime = require('microtime');
const bcrypt = require('bcrypt-nodejs');
let conn = require('../database/database');
var empty = require('is-empty');

let router = express.Router();
const saltRounds = 10;
// Register
router.get('/register', function (req, res) {
    res.render('register');
});

// Login
router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('index');
});

// Register User
router.post('/register', function (req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
    let cle = md5(microtime.now() * 100000);

    // Validation
    req.checkBody('first_name', 'First_name is required').notEmpty();
    req.checkBody('last_name', 'Last_name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be between 6-100 characters long').len(6,100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character a number and a " +
        "special character").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{6,}$/, "i");
    req.checkBody('password2', 'Password must be between 6-100 characters long').len(6,100);
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    let errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors: errors
        })
    }else{
        let slqCheck = 'SELECT * FROM users WHERE username=? OR email=?';
        conn.query(slqCheck,[username, email], function(error, results, fields){
           if(error) throw error;
           if(!empty(results)){
               res.render('register',{
                   msg:"User already exists"
               })
           }
           else{
               bcrypt.genSalt(saltRounds, function(err, salt) {
                       bcrypt.hash(password, salt,null, function(err, hash) {
                           let sql = 'INSERT INTO users(first_name, last_name, username, email, password, cle) VALUES (?, ?, ?, ?, ?, ?);';
                           conn.query(sql,[first_name, last_name, username, email, hash, cle],function(error, results ,fields) {
                               if(error) throw error;
                               req.flash('success_msg', 'You are registered and can now login');
                               res.redirect('/users/login');
                           });
                       });
               });
           }
        });
        }
});

router.post('/login', function (req, res) {

    // let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    let errors = req.validationErrors();
    if(errors) {
        res.render('login', {
            errors: errors
        })
    }
    else{
        let slqCheck = 'SELECT * FROM users WHERE username=?';
        conn.query(slqCheck,[username], function(error, results, fields) {
            if (error) throw error;
            if(empty(results)){
                res.render('login',{
                    msg:"No user exists for this username"
                })
            }
            else{
                let sqlLogin = 'SELECT * FROM users WHERE username=?';
                conn.query(sqlLogin,[username], function (error, results, fields) {
                    if (error) throw error;
                    else{
                        bcrypt.compare(password, results[0].password, function(err, result) {
                            if(!result){
                                res.render('login',{
                                    msg:"Wrong password"
                                })
                            }
                            else{
                                req.flash('success_msg', 'You are registered and can now login');
                                res.redirect('/');
                            }
                        });
                    }
                })
            }
        })
    }

});
module.exports = router;
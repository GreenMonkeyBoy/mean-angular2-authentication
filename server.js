var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan'); // logger
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var validator = require('validator');
var assert = require('assert');

var config = require('./config/database');

require('./config/passport')(passport);

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(passport.initialize());

mongoose.connect(config.database);
var db = mongoose.connection;
var userSchema = require('./models/user');
var User = mongoose.model('User', userSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    //AUTHENTICATION
    // create a new user account
    app.post('/api/signup', function(req, res) {
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass email and password.'});
        } else {

            // CHECK EMAIL
            // isEmail
            if(!validator.isEmail(req.body.email)){
                return res.json({success: false, msg: 'Your email is not valid.'});
            }

            // CHECK PASSWORD
            // length
            if(!validator.isLength(req.body.password, {min:6, max: 16})){
                return res.json({success: false, msg: 'Your password must be between 6 and 16 characters.'});
            }
            // alphanumeric
            if(!validator.isAlphanumeric(req.body.password)){
                return res.json({success: false, msg: 'Your password must contain only letters and numbers.'});
            }

            // create user
            var newUser = new User({
              email: req.body.email,
              password: req.body.password
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                // the email is declared "unique" in the model
                return res.json({success: false, msg: 'Email already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
          }
    });

    // login a user and create a token
    app.post('/api/signin', function(req, res){
        User.findOne({
            email: req.body.email
        }, function(err, user){
            if(err) throw err;

            if(!user){
                res.json({success: false, msg: 'Signin failed, User not found.'});
            }else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: 'JWT ' + token});
                    }else{
                        res.json({success: false, msg: 'Signin failed, wrong password'});
                    }
                });
            }
        });
    });

    // ANGULAR 2 (all others routes)
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(3000, function() {
        console.log('Angular app listening on port 3000');
    });
});

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userObj = require('../model/user');

const User = require('../model/user');


module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'emailAddress', passwordField: 'password' }, (emailAddress, password, done) => {

        User.findOne({
            emailAddress
        }).then(user => {
            if(!user) console.error('No user with email address: ', emailAddress);

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) console.log('[Error]: ', err);

                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
             })
        });
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};



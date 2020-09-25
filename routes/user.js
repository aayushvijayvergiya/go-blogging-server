const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');

const User = require('../model/user');

router.post('/signup', (req, resp) => {
    const { firstName, lastName, mobileNo, emailAddress, penName, password } = req.body.user;

    // @ToDo: Add validation to check if user exists
    
    const newUser = new User ({
        firstName,
        lastName,
        mobileNo,
        emailAddress,
        penName,
        password
    });

    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            
            newUser
                .save()
                .then(user => {
                    console.log('[Signup] User Added: ', user);
                    return resp.json({ data : user });
                })
                .catch(err => console.error('[Error] Signup User: ', err))
        })
    })
})

router.post('/login', passport.authenticate('local'), (req, resp) => {
    req.logIn(req.user, err => {
        if(err) throw err;

        console.log('[Login] User: ', req.user);
        return resp.json({ data: req.user });
    })
    
})

module.exports = router;


let express = require('express');

let router = express.Router();
let passport = require('../authentication');
let User = require('../models/user');


router.post('/logout', (req, res, next) => {

    req.logout();
    res.json({
        success: true
    })

});

router.post('/login', (req, res, next) => {


    passport.authenticate('local', (err, user) => {

        if (user) {

            user.populate('ads', (err, user) => {

                req.logIn(user, () => {


                    res.json(user);

                }) 


            });





        }

    })(req, res, next);


})


router.post('/signup', (req, res) => {


    let newUser = new User(req.body);

    newUser.save((err, user) => {

        if (!err) {
            res.json({
                success: true
            });
        }

    })

    
})

module.exports = router;
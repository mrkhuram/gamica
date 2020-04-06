let passport = require('passport');
let User = require('./models/user');

let Strategy = require('passport-local').Strategy;

let myLocalStrategy = new Strategy({
    usernameField:'email'
},(email, password, next)=>{

    User.findOne({email:email, password:password}, (err, userFound)=>{
        
        if (userFound) {
            next(null, userFound);
        } else {
            next(null, null);
        }
 
    })

});

passport.use(myLocalStrategy);

module.exports = passport;


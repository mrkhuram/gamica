let express = require('express');
let bd = require('body-parser');
let fs = require('fs');

let cors = require('cors');

let User = require('./models/user');

let passport = require('./authentication');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let userRoutes = require('./routes/auth');
let adRoutes = require('./routes/ad');

let myApp = express();

myApp.use(cors());
myApp.use(cookieParser());
myApp.use(expressSession({
    secret: "bilal wants to become a whatsapp cracker"
}));
myApp.use(passport.initialize());
myApp.use(passport.session());


passport.serializeUser((user, next) => {
    next(null, user.id)
});

passport.deserializeUser((userID, next) => {

    User.findOne({ _id: userID }, (err, user) => {

        next(err, user);

    })

});

myApp.use(bd.json());

myApp.use('/auth/', userRoutes);
myApp.use('/ads/', adRoutes);

const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'salesfsd19@gmail.com',
            pass: 'S@lesFsd19@'
        }
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass // generated ethereal password
        // }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'khurram@panacloud.com', // sender address
        to: 'salesfsd19@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<h1>Node mailer working now</h1>' // html body
    });
}

main().then((resp) => {

    console.log(resp);

}).catch(console.error);


myApp.get('/', (req, res, next) => {
    next();
})


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



myApp.use(express.static('./server'));

myApp.use((err, req, res, next) => {

    console.log("error generated here");
    console.log(err);
    res.json(err);

});

myApp.listen(process.env.PORT || 6070, () => {

    console.log('Now I am chaling');

});

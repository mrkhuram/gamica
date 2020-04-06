
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    city: String,
    password:String,
    ads:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

 
let User = mongoose.model('user', userSchema);

module.exports = User;


    let mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://khurran:1234@cluster0-77lw8.mongodb.net/test?retryWrites=true&w=majority', (err, data)=>{
mongoose.connect('mongodb://localhost:27017/owaisDB', (err, data)=>{


    console.log(err || data);

});

let adSchema = mongoose.Schema({
    desc: String,
    img:String,
    price: {
        type: Number,
        require: true
    }
});


let Ad = mongoose.model('ad', adSchema);

module.exports = Ad;

// let ad1 = new Ad();

// ad1.desc = "asasd";
// ad1.price = 200;
// ad1.data = [1,2,3,4];

// ad1.save(function(err, ad){

//     console.log(ad);

// });


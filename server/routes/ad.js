let express = require('express');
let multer = require('multer');
let path = require('path');
let fs = require('fs');

let router = express.Router();
let Ad = require('../models/ad');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req)
        let basePath = path.resolve('./server/my-uploads/' + req.user.email);
        console.log(basePath)

        fs.exists(basePath, (exists) => {

            if (exists) {
                cb(null, basePath);
            } else {
                fs.mkdir(basePath, (err) => {

                    cb(err, basePath);

                })
            }

        })
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage })



router.delete('/delete_ad', (req, res) => {

    Ad.findByIdAndDelete(req.query.cid, (err, deletedobject) => {

        if (!err) {

            let deletedAd = req.user.ads.find((ad) => {

                return ad._id.toString() == req.query.cid;

            })

            req.user.ads.splice(req.user.ads.indexOf(deletedAd), 1);

            req.user.save(() => {

                res.json({
                    ok: true,
                    payload: req.user
                })

            });

        }



    });

});

 
router.post('/post_ad', upload.single("img"), (req, res) => {

    let ad = new Ad(req.body);
    ad.img = '/my-uploads/' + req.user.email + '/' + req.file.originalname;
    console.log(ad)

    ad.save((err, ad) => {

        if (!err) {

            req.user.ads.push(ad);

            req.user.save((err, user) => {

                res.json({
                    ok: true
                });

            });

        }

    });

});

router.get('/get_ads', (req, res) => {

    

    Ad.find({
        // $and: [{ price: { $lt: req.query.max || 0 } }, { price: { $gt: req.query.min || 0 } }]
        // $and: [{ price: { $lt: req.query.max || 0 } }, { price: { $gt: req.query.min || 0 } }]
    }, (err, ads) => {

        console.log(ads);
        
        if (req.user) {

            req.user.populate('ads', (err, user) => {

                res.json({
                    ads: ads,
                    user: user
                });


            });

        } else {
            res.json({
                ads: ads,
                user: { ads: [] }
            });
        }

    })

})




module.exports = router;

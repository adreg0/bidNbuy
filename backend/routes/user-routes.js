let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
require("dotenv").config();
const Razorpay = require("razorpay");

let {userSchema, sellSchema, buySchema, orderPlacedSchema} = require('../models/user-schema');

router.route('/users').post((req, res) => {
    userSchema.create(req.body, (error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/users').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            res.json(data)
        }
    })
})

router.route('/sell').post((req, res) => {
    sellSchema.create(req.body, (error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/sell').get((req, res) => {
    sellSchema.find((error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            res.json(data)
        }
    })
})

router.route('/bid').post((req, res) => {
    buySchema.create(req.body, (error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/bid').get((req, res) => {
    buySchema.find((error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            res.json(data)
        }
    })
})

router.route('/updatebid').post((req, res) => {
    buySchema.findByIdAndUpdate(req.body.id, {bidAccepted: req.body.bidAccepted}, (error, data)=>{
        if(error) {
            console.log("error "+error)
        } else {
            res.json(data)
        }
    })
})

router.route('/orders').post((req, res) => {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: req.body.amount*100, // amount in smallest currency unit
            currency: "INR",
        };

        const order =  instance.orders.create(options, (error, ord)=>{
            if(error){
                res.send(error)
            }else{
                res.json(ord)
            }

        });

    
})
router.route('/ordersplaced').post((req, res) => {
    orderPlacedSchema.create(req.body, (error, data) => {
        if (error) {
            console.log("error "+error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})





module.exports = router;
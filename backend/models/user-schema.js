const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
});

let sellSchema = new Schema({
  soldBy: {
    type: String,
  },
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
});

let buySchema = new Schema({
    buyer: {
      type: String,
    },
    buyingPrice: {
      type: Number,
    },
    seller: {
        type: String,
    },
    productId: {
        type: String
    },
    bidAccepted: {
      type: Boolean,
    },
    productName: {
      type: String,
    }
  });

  let orderPlacedSchema = new Schema({
  razorpay_signature : {
    type: String
  },
  razorpay_order_id : {
    type: String
  },
  transactionid : {
    type: String
  },
  transactionamount : {
    type: Number
  },
  productName: {
    type: String
  },
  seller: {
    type: String
  },
  buyer: {
    type: String
  },
  });

module.exports = {
  userSchema: mongoose.model("User", userSchema),
  sellSchema: mongoose.model("sell", sellSchema),
  buySchema: mongoose.model('buy', buySchema),
  orderPlacedSchema: mongoose.model('orderplaced', orderPlacedSchema),
};

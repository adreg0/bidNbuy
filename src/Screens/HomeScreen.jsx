import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class HomeScreen extends Component {
  state = {
    buyArray: [],
    isFetching: true,
  };

  componentWillMount() {
    axios.get("http://localhost:4000/bid").then((resp) => {
      let prods = resp.data;
      let productArray = [];
      let bidObj = {};
      prods.forEach((product) => {
          console.log(product)
        if (
          product.buyer == localStorage.getItem("user") &&
          product.bidAccepted == true
        ) {
          bidObj = {
            productName: product.productName,
            price: product.buyingPrice,
            seller: product.seller,
          };
          productArray.push(bidObj);
        }
      });
      this.setState({ buyArray: productArray, isFetching: false });
    });
  }

  componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
    document.body.appendChild(script);
  }

  displayRazorpay = (e, item) =>{
    e.preventDefault();
    let amount = item.price
    let options = {
        "key": process.env.RAZORPAY_KEY_ID,
        "amount": item.price, // 2000 paise = INR 20, amount in paisa
        "name": item.productName,
        "description": "bidNbuy",
        'order_id':"",
        "handler": function(response) {
            console.log(response);
            var values ={
                razorpay_signature : response.razorpay_signature,
                razorpay_order_id : response.razorpay_order_id,
                transactionid : response.razorpay_payment_id,
                transactionamount : amount,
                productName: item.productName,
                seller: item.seller,
                buyer: localStorage.getItem("user")
              }
            axios.post('http://localhost:4000/ordersplaced',values)
            .then(res=>{alert("Success")})
            .catch(e=>console.log(e))
        },
        "prefill":{
            "name":'Gali Adarsh Reddy',
            "email":'adarshreddy2003@gmail.com',
            "contact":'1234567890',
        },
        "notes": {
          "address": "Hello World"
        },
        "theme": {
          "color": "#528ff0"
        }
      };
  axios.post('http://localhost:4000/orders',{amount:amount})
      .then(res=>{
          options.order_id = res.data.id;
          options.amount = res.data.amount;
          console.log(options)
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
      })
      .catch(e=>console.log(e))

  }

  renderAcceptedBids = () => {
    if (this.state.isFetching) {
      return <div>Loading...</div>;
    } else {
      let prods = this.state.buyArray;
      return prods.map((item, i) => {
        return (
          <div>
            <div>Product Name: </div>
            <div>{item.productName}</div>
            <div>Price: </div>
            <div>{item.price}</div>
            <button type="button" className=" btn btn-dark btn-sm btn-block" onClick={(e)=>this.displayRazorpay(e, item)}>Buy Now</button>
            <br></br>
            <br></br>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <form>
        <div className="form-group">
        <h2>Hi there! <span class="wave">👋</span></h2>
          <br></br>
          <br></br>
        <button type="button" style={{width: '100%'}} className=" btn btn-primary btn-lg btn-block btn-grad">
        <Link style={{color: "#FFF"}} to="/buy">Buy</Link>
        </button>
        <br></br>
        <br></br>
        <button type="button" style={{width:'100%'}} className=" btn btn-primary btn-lg btn-block btn-grad">
        <Link style={{color: "#FFF"}} to="/sell">Sell</Link>
        
        </button>
        </div>
        
        



        
        {this.state.buyArray.length > 0 ? (
          <div>
            <br></br>
            <br></br>
            <h2>Bids Accepted: </h2>
            {this.renderAcceptedBids()}
          </div>
        ) : null}
        <button type="button" style={{ marginTop: "10%",marginLeft:"35%"}} className=" btn btn-danger btn-lg">
        <Link style={{color: "#FFF"}} to="/login">Log Out</Link>
        </button>
      </form>
    );
  }
}

export default HomeScreen;

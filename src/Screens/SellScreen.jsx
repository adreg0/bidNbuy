import React, { Component } from "react";
import axios from "axios";
class SellScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    productName: "",
    price: 0,
    productList: [],
    isFetching: true,
  };

  componentWillMount() {
    this.getMyProducts();
  }
  getMyProducts = () => {
    axios.get("http://localhost:4000/sell").then((resp) => {
      let prods = resp.data;
      let productObj = {};
      let productArray = [];
      prods.forEach((product) => {
        if (product.soldBy == localStorage.getItem("user")) {
          productObj = {
            productName: product.productName,
            price: product.price,
            id: product._id,
            biddingArray: [],
          };
          productArray.push(productObj);
        }
      });

      this.setState({ productList: productArray, isFetching: false });
    });
    axios.get("http://localhost:4000/bid").then((resp) => {
      let prods = resp.data;
      let productArray = [...this.state.productList];
      let bidObj = {};
      prods.forEach((product) => {
        if (product.seller == localStorage.getItem("user")) {
          productArray.forEach((item, i) => {
            if (item.id == product.productId) {
              bidObj = {
                buyer: product.buyer,
                buyingPrice: product.buyingPrice,
                bidAccepted: product.bidAccepted,
                id: product._id
              };
              productArray[i].biddingArray.push(bidObj);
            }
          });
        }
      });
      this.setState({ productList: productArray, isFetching: false });
    });
  };

  post = () => {
    window.alert("Item posted");
    let details = {
      soldBy: localStorage.getItem("user"),
      productName: this.state.productName,
      price: this.state.price,
    };
    axios
      .post("http://localhost:4000/sell", details)
      .then(() => {
        this.getMyProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  bidAccepted = (e, bid)=>{
    let details={
      id: bid.id,
      bidAccepted: true
    }
    console.log(details)
    axios
      .post("http://localhost:4000/updatebid", details)
      .then(()=>{
        this.getMyProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderBids = (item) => {
    if (item.biddingArray.length != 0) {
      return item.biddingArray.map((bid, i) => {
        return (
          <div>
            <span> Bidding Price: {bid.buyingPrice} -------- </span>
            {
              bid.bidAccepted? <span>  Bid Accepted</span>:
              <button class="btn btn-primary btn-sm" onClick={(e)=>{this.bidAccepted(e, bid)}}>Accept</button>
            }
            
            <br></br>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  renderProducts = () => {
    if (this.state.isFetching) {
      return <div>Loading</div>;
    } else {
      let prods = this.state.productList;
      return prods.map((item, i) => {
        return (
          <div className="column">
            <div className="card">
            <div>Product Name: {item.productName} </div>
            <div> Price: {item.price}</div>
            {this.renderBids(item)}
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div style={{width: '100%'}}>
      <div>
        <h3>Sell</h3>
        <div className="form-group">
        <label for="product">Product name</label>
        <input
          id="product"
          type="text"
          onChange={(e) => {
            this.setState({ productName: e.target.value });
          }}
          className="form-control"
        />
        </div>
        <div className="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          type="number"
          onChange={(e) => {
            this.setState({ price: e.target.value });
          }}
          className="form-control"
        />
        </div>
        <br></br>
        <button className="form-control btn btn-primary btn-block" onClick={this.post}>Sell</button>
        </div>
        {
          this.state.productList.length>0?
          <div>
            <br></br><br></br><br></br>
            <h3>My products</h3>
            <div className="row" >
        {this.renderProducts()}
        </div>
          </div>: null
        }

        
        
        </div>
    );
  }
}

export default SellScreen;

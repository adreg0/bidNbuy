import React, { Component } from "react";
import axios from "axios";
class BuyScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    productList: [],
    isFetching: true,
  };

  componentWillMount() {
    console.log("mount will");
    axios.get("http://localhost:4000/sell").then((resp) => {
      let prods = resp.data;
      console.log(prods);
      let productObj = {};
      let productArray = [];
      prods.forEach((product) => {
        productObj = {
          productName: product.productName,
          price: product.price,
          id: product._id,
          seller: product.soldBy,
        };
        productArray.push(productObj);
      });

      this.setState({ productList: productArray, isFetching: false });
    });
  }

  onBid = (e, item) => {
    let details = {
      buyer: localStorage.getItem("user"),
      buyingPrice: item.bidPrice,
      seller: item.seller,
      productId: item.id,
      bidAccepted: false,
      productName: item.productName,
    };
    axios
      .post("http://localhost:4000/bid", details)
      .then(() => {
        window.alert("Bid successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderProducts = () => {
    if (this.state.isFetching) {
      return <div>Loading...</div>;
    } else {
      let prods = this.state.productList;
      return prods.map((item, i) => {
        return (
          <div className="column">
              <div className="card">
            <div>Product Name: {item.productName} </div>
            <div> Price: {item.price}</div>
            <div className="btn-group">
            <input
              onChange={(e) => {
                this.state.productList[i].bidPrice = e.target.value;
                this.setState(this.state);
              }}
              type="number"
              className="form-control"
              placeholder="Bidding price"
            />
            <button type="button" class="btn btn-primary" onClick={(e) => this.onBid(e, item)}>bid</button>
            </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <form>
        <h3>Buy</h3>
        {this.state.productList.length > 0 ? (
          <div className="row">{this.renderProducts()}</div>
        ) : null}
      </form>
    );
  }
}

export default BuyScreen;

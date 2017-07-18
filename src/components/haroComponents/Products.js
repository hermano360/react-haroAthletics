import React, { Component } from 'react';
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap';
import superagent from 'superagent';
import Checkout from './Checkout';
import products from './allProducts.js';
import Items from './Items'
class Products extends Component {
  constructor(){
    super()
    this.state = {
      checkoutTotal:0,
      checkoutItems:[],
      view:"allProducts"
    }
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart(url,index,category){
    if(category==="individualItems"){
      this.setState({
        checkoutItems:[
          ...this.state.checkoutItems,
          products[category][index]
        ]
      })
    }
  }

  render(){

    const individualItemsView=()=>{
      return products.individualItems.map((item,index)=>{
        return (
          <Items key={item.url} {...item} index={index} category={"individualItems"} addToCart={this.addToCart}/>
        )
      })
    };
      if(this.state.view === 'allProducts'){
        return (
          <section id="products" className="container-fluid content-section text-center inverse-color">
            <div className="section-content">
              <h2 className="section-title inverse-color">Products</h2>
              <h4 className="section-headings inverse-color">Current Campaigns</h4>
              <div className="container columns">
                <img className="product-shirt" src="/organizations/FSHA/FSHA_Logo.jpg"/>
                <div className="btn btn-primary">Go To Campaign</div>
              </div>
              <div className="container columns">
                <img className="product-shirt" src="/organizations/IH/IHHS_Logo.jpg"/>
                <div className="btn btn-primary">Go To Campaign</div>
              </div>
              <h4 className="product-headings inverse-color">Individual Items</h4>
              {individualItemsView()}
              <Checkout
                name={'The Road to learn React'}
                description={"Only the Book"}
                amount={this.state.total}
              />
            </div>
          </section>
        )
      } else {
          return (
            <div>Alllll of my love</div>
          )
        }
    }
}

export default Products

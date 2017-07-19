import React, { Component } from 'react';
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel,OverlayTrigger, Popover} from 'react-bootstrap';
import superagent from 'superagent';
import Checkout from './Checkout';
import products from './allProducts.js';
import Items from './Items'
import Organizations from './Organizations'



class Products extends Component {
  constructor(){
    super()
    this.state = {
      checkoutTotal:0,
      checkoutItems:[],
      cartItems:[],
      campaignItems:[],
      organization:'',
      view:"allProducts"
    }
    this.addToCart = this.addToCart.bind(this);
    this.goToCampaign = this.goToCampaign.bind(this);
    this.backToMainScreen = this.backToMainScreen.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
    this.renderCart = this.renderCart.bind(this);
  }
  backToMainScreen(){
    this.setState({
      campaignItems:[],
      organization:'',
      view:'allProducts'
    })
  }
  renderCart(){
    let {checkoutItems} = this.state;
    return checkoutItems.map((item)=>{
      return (
        <div><strong>{item.name}</strong>-<strong>{item.productOption}</strong>-<strong>{item.qty}</strong>-<strong>`$${parseFloat(item.productPrice).toFixed(2)}`</strong></div>
      )
    })
  }

  goToCheckout(){
    this.setState({
      view:'checkout',
      campaignItems:[],
      organization:''
    })
  }
  addToCart(index,category, productOption, productPrice, name){
    let {checkoutItems} = this.state;
    let repeatedItem = false;
    let updatedCheckoutItems = checkoutItems.map((item)=>{
      if(item.name === name && item.productOption === productOption){
        repeatedItem = true;
        return {
          name:item.name,
          productOption:item.productOption,
          productPrice:item.productPrice,
          qty:item.qty+1
        }
      } else {
        return {
          name:item.name,
          productOption:item.productOption,
          productPrice:item.productPrice,
          qty:item.qty
        }
      }

    })
    if(!repeatedItem){
      updatedCheckoutItems.push({
        name,
        productOption,
        productPrice,
        qty:1
      })
    }
      this.setState({
        checkoutItems:[
          ...updatedCheckoutItems,
        ]
      })

  }

  goToCampaign(organization, logo, products){
    this.setState({
      view:'campaign',
      campaignItems:products,
      organization
    })
  }

  render(){
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" title="Cart">
        <div><strong>Name</strong>-<strong>Options</strong>-<strong>Quantity</strong>-<strong>Price</strong></div>
        {this.renderCart()}
      </Popover>
    );

    const campaignItems = ()=>{
      let {campaignItems} = this.state;
      return campaignItems.map((item,index)=>{
        console.log(item);
        return (
          <Items key={item.url} {...item} index={index} category={"campaignItems"} organization={this.state.organization} handleClick={this.addToCart} popoverClickRootClose={popoverClickRootClose}/>
        )
      })
    }

    const organizationsView=()=>{
      return products.organizations.map((item,index)=>{
        return (
          <Organizations key={item.organization} {...item} index={index} category={"organization"} goToCampaign={this.goToCampaign}/>
        )
      })
    };

    const individualItemsView=()=>{
      return products.individualItems.map((item,index)=>{
        return (
          <Items key={item.url} {...item} index={index} category={"individualItems"} handleClick={this.addToCart} popoverClickRootClose={popoverClickRootClose}/>
        )
      })
    };
      if(this.state.view === 'allProducts'){
        return (
          <section id="products" className="container-fluid content-section text-center inverse-color">
            <div className="section-content">
              <h2 className="section-title inverse-color">Products</h2>
              <h4 className="section-headings inverse-color">Current Campaigns</h4>
              {organizationsView()}
              <h4 className="product-headings inverse-color">Individual Items</h4>
              {individualItemsView()}
              <div className="btn btn-default" onClick={this.goToCheckout}>Checkout</div>
            </div>
          </section>
        )
      } else if(this.state.view === 'campaign') {
          return (
            <section id="products" className="container-fluid content-section text-center inverse-color">
              <div className="section-content">
                {campaignItems()}
                <div className="btn btn-default" onClick={this.backToMainScreen}>Back to Main Screen</div>
              </div>
            </section>
          )
        } else if(this.state.view === 'checkout'){
          return (
          <section id="products" className="container-fluid content-section text-center inverse-color">
            <div className="section-content">
              <Checkout
                name={'HaroAthletics'}
                description={JSON.stringify(this.state.checkoutItems)}
                amount={5}
                backToMainScreen={this.backToMainScreen}
              />
              <div className="btn btn-default" onClick={this.backToMainScreen}>Back to Main Screen</div>
            </div>
          </section>)
        }
    }
}

export default Products

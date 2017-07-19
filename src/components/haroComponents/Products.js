import React, { Component } from 'react';
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel,OverlayTrigger, Popover, Table, Glyphicon} from 'react-bootstrap';
import superagent from 'superagent';
import Checkout from './Checkout';
import products from './allProducts.js';
import Items from './Items'
import Organizations from './Organizations'
import CartItem from './CartItem'
import EditItemModal from './EditItemModal'



class Products extends Component {
  constructor(){
    super()
    this.state = {
      checkoutTotal:0,
      checkoutItems:[],
      campaignItems:[],
      organization:'',
      view:"allProducts",
      logo:"",
      modalShow: false
    }
    this.addToCart = this.addToCart.bind(this);
    this.goToCampaign = this.goToCampaign.bind(this);
    this.backToMainScreen = this.backToMainScreen.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
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
        <div><strong>{item.name}</strong>-<strong>{item.productOption}</strong>-<strong>{item.qty}</strong>-<strong>${parseFloat(item.productPrice).toFixed(2)}</strong></div>
      )
    })
  }

  handleEditClick(name,productOption){
    this.setState({
      modalShow:true
    })
  }

  goToCheckout(){
    this.setState({
      view:'checkout',
      campaignItems:[],
      organization:''
    })
  }
  addToCart(index,category, productOption, productPrice, name,organization){
    let {checkoutItems} = this.state;
    let repeatedItem = false;
    let updatedCheckoutItems = checkoutItems.map((item)=>{
      if(item.name === name && item.productOption === productOption){
        repeatedItem = true;
        return {
          name:item.name,
          productOption:item.productOption,
          productPrice:item.productPrice,
          qty:item.qty+1,
          index: item.index,
          organization:item.organization
        }
      } else {
        return {
          name:item.name,
          productOption:item.productOption,
          productPrice:item.productPrice,
          qty:item.qty,
          index:item.index,
          organization:item.organization
        }
      }

    })
    if(!repeatedItem){
      updatedCheckoutItems.push({
        name,
        productOption,
        productPrice,
        qty:1,
        index,
        organization
      })
    }
    let checkoutTotal = 0;
    updatedCheckoutItems.forEach((item)=>{
      checkoutTotal += parseFloat(item.qty) * parseFloat(item.productPrice)
    });
      this.setState({
        checkoutItems:[
          ...updatedCheckoutItems,
        ],
        checkoutTotal: checkoutTotal.toFixed(2)
      })

  }

  goToCampaign(organization, logo, products){
    this.setState({
      view:'campaign',
      campaignItems:products,
      organization,
      logo
    })
  }

  editItem(){

  }

  render(){
    const goToCheckoutButton = (
      <div className="btn btn-default" onClick={this.goToCheckout}>Proceed to Checkout</div>
    );
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" title="Cart">
        <div><strong>Name</strong>-<strong>Options</strong>-<strong>Quantity</strong>-<strong>Price</strong></div>
        {this.renderCart()}
      </Popover>
    );
    const backToMainScreenButton = () =>{
      return (<div className="btn btn-default" onClick={this.backToMainScreen}>Back to Main Screen</div>
    )};

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

    const checkoutItemView = () =>{
      return this.state.checkoutItems.map((item)=>{
        let organization = "";
        if(item.organization) {organization = `(${item.organization})`}
        return (
          <CartItem key={item.name} item={item} organization={organization} handleEditClick={this.handleEditClick}/>
        )
      })
    };
    const checkoutItemViewTotal = () =>{
        return (
          <tr>
            <td className="grandTotal">Grand Total</td>
            <td>${this.state.checkoutTotal}</td>
            <td></td>
          </tr>
        )
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
              {goToCheckoutButton}
            </div>
          </section>
        )
      } else if(this.state.view === 'campaign') {
          return (
            <section id="products" className="container-fluid content-section text-center inverse-color">
              <div className="section-content">
                {backToMainScreenButton()}
                <img className="product-shirt" src={`/organizations/${this.state.organization}/${this.state.logo}`} />
                {campaignItems()}
                {goToCheckoutButton}
              </div>
            </section>
          )
        } else if(this.state.view === 'checkout'){
          return (
          <section id="products" className="container-fluid content-section text-center inverse-color">
            <div className="section-content">
              <h2 className="section-title inverse-color">Checkout</h2>
              {backToMainScreenButton()}
              <div className="checkoutTable">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <div className="centerCell">
                        Description
                        </div>
                      </th>
                      <th className="centerCell">Qty x Each = Price</th>
                      <th><Glyphicon glyph="edit" onClick={()=>{console.log(test)}}/></th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkoutItemView()}
                    {checkoutItemViewTotal()}
                  </tbody>
                </Table>
              </div>
              <Checkout
                name={'HaroAthletics'}
                description={JSON.stringify(this.state.checkoutItems)}
                amount={5}
                backToMainScreen={this.backToMainScreen}
              />
            </div>
          </section>)
        }
    }
}

export default Products

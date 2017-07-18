import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap'
import superagent from 'superagent'

class Items extends Component {
  constructor(){
    super()
    this.state = {
    }

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(){
    let {url, index,category} = this.props;
    this.props.addToCart(url,index,category)
  }


  render(){
    return (
      <div className="container columns">
        <img className="product-shirt" src={`/individualItems/${this.props.url}`}/>
        <div className="btn btn-primary" onClick={this.addToCart}>Add To Cart</div>
      </div>
    )
  }
}

export default Items

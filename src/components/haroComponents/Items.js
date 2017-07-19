import React, { Component } from 'react'
import {Button,OverlayTrigger, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import superagent from 'superagent'

class Items extends Component {
  constructor(){
    super()
    this.state = {
      productOption:'',
      productPrice:0,
      valid:false
    }

    this.handleClick = this.handleClick.bind(this);
    this.renderPriceOptions = this.renderPriceOptions.bind(this);
    this.testSelected = this.testSelected.bind(this);
  }

  handleClick(){
    let {index,category,name} = this.props;
    let {productOption, productPrice} = this.state;
    if(productPrice !== 0 && productOption !== "" && productOption !== "select"){
      this.props.handleClick(index,category, productOption, productPrice, name)
    }
  }
  testSelected(evt){
    evt.preventDefault();
    let productOption = evt.target.value;
    let productPrice = this.props.priceOptions[evt.target.value];
    if( productOption !== 'select'){
      this.setState({
        productOption,
        productPrice,
        valid:true
      })
    } else {
        this.setState({
          productOption:"",
          productPrice:0,
          valid:false
        })
    }
  }
  renderPriceOptions(){
    let {priceOptions} = this.props;
    return Object.keys(priceOptions).map((option)=>{
      return (
        <option value={option} key={priceOptions[option]}>{option}</option>
      )
    })
  }


  render(){
    let category;
    if(this.props.category==='individualItems'){
      category='individualItems';
    } else {
      category=`organizations/${this.props.organization}/`
    }
    let addToCartButton = (<div></div>)
    if(this.state.valid){
      addToCartButton = (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.props.popoverClickRootClose}>
          <div className="btn btn-primary" onClick={this.handleClick}>Add to Cart</div>
        </OverlayTrigger>)
    } else {
      addToCartButton = (<div></div>)
    }
    return (
      <div className="container columns">
        <img className="product-shirt" src={`/${category}/${this.props.url}`}/>
        <FormGroup controlId={this.props.name}>
          <ControlLabel>Size</ControlLabel>
          <FormControl ref="selected" componentClass="select" placeholder="select" onChange={this.testSelected} >
            <option value="select">Select Size</option>
            {this.renderPriceOptions()}
          </FormControl>
        </FormGroup>
        {addToCartButton}
      </div>
    )


  }
}

export default Items

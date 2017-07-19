import React, { Component } from 'react'
import {Glyphicon} from 'react-bootstrap'
import superagent from 'superagent'

class CartItem extends Component {
  constructor(){
    super()
    this.state = {
    }

    this.onEditClick = this.onEditClick.bind(this);
  }

  onEditClick(){
    let {name,productOption} = this.props;
    this.props.handleEditClick(name,productOption)
  }

  render(){
    let {name, productOption, qty, productPrice}= this.props.item;
    let {organization} = this.props;
    return (
      <tr>
        <td>
          <div className="centerCell itemDescription">
            {name} - {productOption} {organization}
          </div>
        </td>
        <td>{qty} x ${productPrice.toFixed(2)} = ${parseFloat(qty * productPrice).toFixed(2)}</td>
        <td><Glyphicon glyph="unchecked" onClick={this.onEditClick}/></td>
      </tr>
    )
  }
}

export default CartItem

import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap'
import superagent from 'superagent'

class Products extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  render(){
    return (
      <section id="products" className="container-fluid content-section text-center">
              <h2>Products</h2>
              <h4 className="product-headings">T-Shirts</h4>
              <div className="container columns">
                  <div className= "one-third">
                      <img className="product-shirt" src="http://www.kustom-tees-4-u.com/products/1/5046091.png"/>
                      <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                          <input type="hidden" name="cmd" value="_s-xclick"/>
                          <input type="hidden" name="hosted_button_id" value="X75JBVHUVM7SA"/>
                              <input type="hidden" name="on0" value="Size"/><div>Size</div>
                              <select className= "select-option" name="os0">
                                  <option value="Small">Small </option>
                                  <option value="Medium">Medium </option>
                                  <option value="Large">Large </option>
                                  </select>
                          <input className="add-to-cart" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                          <img alt=""   src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                      </form>
                  </div>
                  <div className= "one-third">
                      <img className="product-shirt" src="http://www.kustom-tees-4-u.com/products/1/5046091.png"/>
                      <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                          <input type="hidden" name="cmd" value="_s-xclick"/>
                          <input type="hidden" name="hosted_button_id" value="X75JBVHUVM7SA"/>
                              <input type="hidden" name="on0" value="Size"/><div>Size</div>
                              <select className= "select-option" name="os0">
                                  <option value="Small">Small </option>
                                  <option value="Medium">Medium </option>
                                  <option value="Large">Large </option>
                                  </select>
                          <input className="add-to-cart" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif"   name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                          <img alt=""   src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                      </form>
                  </div>
              </div>

      </section>
    )


  }
}

export default Products

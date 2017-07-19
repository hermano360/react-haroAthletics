import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap'
import superagent from 'superagent'

class Organizations extends Component {
  constructor(){
    super()
    this.state = {
    }

    this.goToCampaign = this.goToCampaign.bind(this);
  }

  goToCampaign(){
    let {organization, logo, products} = this.props;
    this.props.goToCampaign(organization, logo, products);
  }


  render(){
    let {organization, logo} = this.props;
    return (
      <div className="container columns">
        <img className="product-shirt" src={`/organizations/${organization}/${logo}`} />
        <div className="btn btn-primary" onClick={this.goToCampaign}>Go To Campaign</div>
      </div>
    )
  }
}

export default Organizations

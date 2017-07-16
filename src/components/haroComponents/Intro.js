import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav} from 'react-bootstrap'
import superagent from 'superagent'

class Intro extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  render(){
    return (
      <div className="intro">
        <div className="intro-body"></div>
      </div>
    )


  }
}

export default Intro

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
        <a href="#about" id="intro-button">
          <div id="intro-button-container">
          <i className="fa fa-angle-double-down animated"></i>
          </div>
        </a>
      </div>
    )


  }
}

export default Intro

import React, {Component} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import superagent from 'superagent'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav} from 'react-bootstrap'
const axios = require('axios')
import About from './haroComponents/About.js'
import Intro from './haroComponents/Intro.js'
import Products from './haroComponents/Products.js'
import Donate from './haroComponents/Donate.js'
import Footer from './haroComponents/Footer.js'

class Main extends Component {
  constructor(){
    super()
    this.state = {
    }
    //this.test = this.test.bind(this);

  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                        Menu <i className="fa fa-bars"></i>
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top">
                        <i className="fa fa-life-saver"></i> Haro<b>Athletics</b>
                    </a>
                </div>

                <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
                    <ul className="nav navbar-nav">
                        <li className="hidden">
                            <a href="#page-top"></a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#products">Products</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#donate">Donate</a>
                        </li>
                    </ul>
                </div>

            </div>

        </nav>
        <Intro/>
        <About/>
        <Products/>
        <Donate/>
        <Footer/>
</div>
    )
  }
}

export default Main

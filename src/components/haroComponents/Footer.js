import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav} from 'react-bootstrap'
import superagent from 'superagent'

class Footer extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  render(){
    return (
      <footer>
          <div className="container text-center contact-footer">
            <br/>
              <p>Copyright &copy; HaroAthletics 2017</p>
              <h7>Contact</h7>
              <br/>
                <p><a href="mailto:feedback@startbootstrap.com">rubenharo@gmail.com</a>
                </p>
                <p>765-543-6543</p>
          </div>
      </footer>
    )


  }
}

export default Footer

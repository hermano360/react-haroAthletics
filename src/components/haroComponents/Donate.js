import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap'
import superagent from 'superagent'

class Donate extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  render(){
    return (
      <section id="donate" className="container content-section text-center">
                  <h2>Donate</h2>

                  <div className = "donation-information">
                      <h4 className="donation-headings">Charity of the Month</h4>
                      <img className="donation-shirt" src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/17022205_10154220739377611_6746995110482650659_n.jpg?oh=745ea1aadddc76fddd634062729f99c9&oe=59EA0E32"/>
                      <h4 className="donation-headings">#TeamJessica</h4>
                      <p className="donation-text">A wonderful organization has given us the opportunity to raise money for a cure for A-T by volunteering! Saturday, May 6 in Pomona and Saturday, June 10 San Bernardino #TeamJessica is being asked to provide 20 volunteers to serve at a family fun run type event. Plan to stay all day. Each person who serves will earn $50 towards the ATCP. Kids ages 12 -15 are welcome with a parent. Ages 16 and up do not need a parent. The organization needs a firm commitment from everyone who volunteers, so please make sure this works into your schedule.</p>

                      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                          <input type="hidden" name="cmd" value="_s-xclick"/>
                          <input type="hidden" name="hosted_button_id" value="4A7EN4G4L4SUL"/>
                          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"  name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                          <img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                      </form>
                  </div>
      </section>
    )


  }
}

export default Donate

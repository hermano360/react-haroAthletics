import React, { Component } from 'react'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav, Carousel} from 'react-bootstrap'
import superagent from 'superagent'

class About extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }



  render(){
    return (
      <section id="about" className="container content-section text-center">
        <div className="section-content">
                  <h2 className="section-title">About</h2>
                  <div className="about-section">
                  <h6 className="section-body">Haro Athletics is a family owned company that believes in building community through designs and donations.  They began in 2015, and have since then helped many families and organizations.  Their goal is to continue to build strong relationships with their customers and help them achieve their goals. </h6>

                  <h4 className="section-headings">Mission</h4>
                  <h6 className="section-body">Our mission is provide families and organizations with the ability to raise funds for their cause, and also donate to local charities. </h6>
                  </div>
                  <Carousel id="about-carousel">
                    <Carousel.Item>
                      <img width={500} height={500} alt="900x500" src="FamilyPic2017.jpg"/>
                      <Carousel.Caption>
                        <p>Ruben</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img width={900} height={500} alt="900x500" src="FamilyPic2017.jpg"/>
                      <Carousel.Caption>
                        <p>Ruben</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img width={900} height={500} alt="900x500" src="FamilyPic2017.jpg"/>
                      <Carousel.Caption>
                        <p>Ruben</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
              <div className="about-section">
                  <h4 className="section-headings">Vision</h4>
                  <h6 className="section-body">Haro Athletics believes in supporting different causes that build community. </h6>
              </div>
        </div>
      </section>
    )
  }
}

export default About

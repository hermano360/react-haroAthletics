import React, {Component} from 'react'
import superagent from 'superagent'
import {Button,Navbar,NavItem, NavDropdown,MenuItem,Nav} from 'react-bootstrap'
const axios = require('axios')

class Main extends Component {
  constructor(){
    super()
    let name = "", email ="", phone="";
    if(localStorage.aquaName !== undefined){
      name = localStorage.aquaName;
    }
    if(localStorage.aquaPhone !== undefined){
      phone = localStorage.aquaPhone;
    }
    if(localStorage.aquaEmail !== undefined){
      email = localStorage.aquaEmail;
    }

    this.state = {
      incidents:[],
      reportLocation:[],
      page:'welcome',
      name,
      email,
      phone,
      reportType:"",
      firstOpen:true,
      sidebar:false,
      category:''
    }
    this.handleIconClick=this.handleIconClick.bind(this);
    this.handleInfoClick=this.handleInfoClick.bind(this);
    this.handleSettingsClick=this.handleSettingsClick.bind(this);
    this.handleButton=this.handleButton.bind(this);
    this.submitReport=this.submitReport.bind(this);
    this.closeIcons=this.closeIcons.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.closeSettings=this.closeSettings.bind(this);
    this.handleMarkers=this.handleMarkers.bind(this);
    this.handleReport=this.handleReport.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.modalAccept = this.modalAccept.bind(this);
    this.clearInfo = this.clearInfo.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }
  clearInfo(){
    this.setState({
      name:"",
      email:"",
      phone:""
    })
  }
  updateMarkers(incidents){
    this.setState({
      incidents
    })
  }
  modalAccept(){
    let validatedItems = {};
    let email = this.refs.modalEmail.state.value;
    let name = this.refs.modalName.state.value;
    let phone = this.refs.modalPhone.state.value;

    if(name !== "" && this.validateName(name)){
      validatedItems['name'] = name;
    }
    if(phone !== "" && this.validatePhone(phone)){
      phone =  phone.replace(/[-\(\)]/gi, '');
      validatedItems['phone'] = phone;
    }
    if(email !== "" && this.validateEmail(email)){
      validatedItems['email'] = email;
    }
    localStorage.setItem('aquaName', name);
    localStorage.setItem('aquaPhone',phone);
    localStorage.setItem('aquaEmail', email);

    this.setState(
      validatedItems
    )
    $(`#introModal`).modal('close');
  }
  modalCancel(){
    $(`#introModal`).modal('close');
  }

  handleIconClick(evt){
    this.setState({
      page:'IconPage'
    })
  }
  returnHome(){
    this.setState({
      page:'welcome'
    })
  }
  handleInfoClick(){
    // $('.button-collapse').sideNav('hide')
    this.setState({
      page:'InfoPage'
    })
  }
  handleSettingsClick(){
    // $('.button-collapse').sideNav('hide')
    this.setState({
      page:'SettingsPage'
    })
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
  }

  validateName(name){
    var re = /^[a-zA-Z\s]*$/i
    return re.test(name)
  }
  validatePhone(phone){
    var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/i;
    return re.test(phone)

  }
  updateUserInfo(name,email,phone){
    // $('.button-collapse').sideNav('hide')
    let updatedItems = {};
    if(name !== "" && name && this.validateName(name)){
      updatedItems['name'] = name;
    }
    if(email !== "" && email && this.validateEmail(email)){
      updatedItems['email']= email;
    }
    if(phone !== "" && phone && this.validatePhone(phone)){
      updatedItems['phone'] = phone;
    }
    this.setState(
      updatedItems
    )
  }

  handleMapClick(evt){
    this.setState({
      reportLocation: [
        {
          type: '',
          lng:parseFloat(evt.latLng.lng()),
          lat:parseFloat(evt.latLng.lat()),
          showInfo:false
        }
      ]
    })
  }

  handleReport(reportType,category){
    // $('.button-collapse').sideNav('hide')
    this.setState({
      page:'Report',
      reportType,
      category
    })
  }

  submitReport(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date){
    var requestUrl = `/sendFeedback`
    axios({
    method: 'post',
    url: requestUrl,
    data: {
      lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date
    }
    }).then(function(res){
        console.log('successful')
      }).catch(function (error) {
        console.log('not successful')
      console.log(error);
    })

    const url = '/getIncidents'
    superagent
    .get(url)
    .query(null)
    .set('Accept','text/json')
    .end((err,response)=>{
      this.setState({
        page:'welcome',
        reportLocation:[],
        incidents: response.body
      })
    })

  }
  closeIcons(){
    this.setState({
      page:'welcome'
    })
  }
  closeSettings(name,email){
    this.setState({
      page:'welcome',
      name,
      email
    })
  }

  handleButton(){
    this.setState({
      page:'ReportForm',
      firstOpen:false
    })
  }
  handleMarkers(incidents){
    this.setState({
      incidents
    })

  }
  testFunction(){
    console.log("test")
  }

  componentDidMount(){
    const url = '/getIncidents'
    superagent
    .get(url)
    .query(null)
    .set('Accept','text/json')
    .end((err,response)=>{
      let incidents = response.body;
      this.setState({
        incidents: incidents
      })
    })
    $(`#introModal`).modal('open');
  }


  render(){
    return (
      <div>
        <Navbar inverse collapseOnSelect fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">HaroAthletics</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="#about">About</NavItem>
              <NavItem eventKey={2} href="#">Products</NavItem>
              <NavItem eventKey={3} href="#">About</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="intro">
          <div className="intro-body">Haro Athletics - About Page</div>
        </div>
        <div id="about">
          <div className="about-body">Haro Athletics - About Page</div>
        </div>
</div>
    )
  }
}

export default Main

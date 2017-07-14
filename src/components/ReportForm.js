import React, {Component} from 'react'
import superagent from 'superagent'
import {Button} from 'react-materialize'
const axios = require('axios')


class ReportForm extends Component {
  constructor(){
    super()
    this.submitReport=this.submitReport.bind(this);
    this.backToCategories=this.backToCategories.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleLow = this.handleLow.bind(this);
    this.handleMild = this.handleMild.bind(this);
    this.handleMedium = this.handleMedium.bind(this);
    this.handleExtensive = this.handleExtensive.bind(this);

    this.state={
        city:"",
        streetAddress:"",
        formattedAddress:"",
        postalCode:"",
        state:"",
        lat:"",
        lng:"",
        level:""
      }
    }

    handleLow(){
      this.setState({
        level:"Low"
      })
    }
    handleMild(){
      this.setState({
        level:"Mild"
      })
    }
    handleMedium(){
      this.setState({
        level:"Medium"
      })
    }
    handleExtensive(){
      this.setState({
        level:"Extensive"
      })
    }

    handleAddressChange(event) {
      this.setState({
        streetAddress: event.target.value});
    };
    handleCityChange(event) {
      this.setState({
        city: event.target.value});
    };
    handleStateChange(event) {
      this.setState({
        state: event.target.value});
    };
    handlePostalCodeChange(event) {
      this.setState({
        postalCode: event.target.value});
    };

    testFunction(){
      console.log("input box changed")
    }
  submitReport(){
    let lat,lng,formattedAddress;
    let today = new Date();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = `${today.getDate()}-${monthNames[today.getMonth()]}-${today.getFullYear()}`;

    let reportType = this.props.reportType,
    category = this.props.category,
    moreInfo = this.refs.moreInfo.value,
    level = this.state.level,
    name = this.refs.name.value,
    email = this.refs.email.value,
    phone = this.refs.phone.value;

    if(this.state.lat !== "" && this.state.lng !== ""){
      lat= this.state.lat;
      lng = this.state.lng;
      formattedAddress = this.state.formattedAddress;
      this.props.submitReport(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date);
    } else {
      if(this.state.streetAddress !== "" && ((this.state.city !=="" && this.state.state !=="" ) || this.state.postalCode !=="")){
        let addressQuery = `${this.state.streetAddress} ${this.state.city} ${this.state.state} ${this.state.postalCode}`
        superagent
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=AIzaSyBywzQtT3py3NdsI1ivrFyDo0vMDHEVk40`)
        .query(null)
        .set('Accept','text/json')
        .end((err,response)=>{
          if(response.body.status !== 'ZERO_RESULTS'){
            console.log(response,err)
            formattedAddress = response.body.results[0].formatted_address;
            lat = response.body.results[0].geometry.location.lat;
            lng = response.body.results[0].geometry.location.lng;
            this.props.submitReport(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date);
          }
        });
      }
    }



  }

  componentDidMount(){


  }
  componentWillMount(){
    let lat="",lng="";
    if(this.props.reportLocation && this.props.reportLocation.lat && this.props.reportLocation.lat !== "" && this.props.reportLocation && this.props.reportLocation.lng !== ""){
          lat = this.props.reportLocation.lat;
          lng = this.props.reportLocation.lng;
          superagent
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.reportLocation.lat},${this.props.reportLocation.lng}&key=AIzaSyBywzQtT3py3NdsI1ivrFyDo0vMDHEVk40`)
          .query(null)
          .set('Accept','text/json')
          .end((err,response)=>{
            console.log(response.body.results,err)
            let city="", streetAddress="", formattedAddress="", postalCode="", state="";

            response.body.results.forEach((entry)=>{
              if(entry.types.includes('locality')){
                city = entry.address_components[0].long_name;
              } else if(entry.types.includes('street_address')){
                streetAddress = `${entry.address_components[0].short_name} ${entry.address_components[1].short_name}`;
                formattedAddress = entry.formatted_address;
              } else if(entry.types.includes('postal_code')){
                postalCode = entry.address_components[0].long_name
              } else if(entry.types.includes('administrative_area_level_1')){
                state = entry.address_components[0].short_name
              }
            })
            this.setState({
                city,
                streetAddress,
                formattedAddress,
                postalCode,
                state,
                lat,
                lng
            })
          });
          }
        }


    backToCategories(){
      this.props.backToCategories();
    }

  render(){
    const {reportLocation} = this.props;
    let {city,streetAddress,state,postalCode} = this.state
    const reverseGeolocation = () =>{
      return (
        <div className="row text-align center">
            <div className="input-field col s9">
              <input type="text" id="generatedAddress" value={this.state.streetAddress} onChange={this.handleAddressChange} />
              <label htmlFor="generatedAddress" className="active">Street Address</label>
            </div>
            <div className="input-field col s12 m3" >
              <input id="generatedCity" type="text"  value={this.state.city} onChange={this.handleCityChange}/>
              <label htmlFor="generatedCity" className="active">City *</label>
            </div>
            <div className="input-field col s12 m4">
              <input id="generatedState" type="text"  value={this.state.state} onChange={this.handleStateChange}/>
              <label htmlFor="generatedState" className="active">State *</label>
            </div>
            <div className="input-field col s12 m4">
              <input id="generatedPostalCode" type="text" value={this.state.postalCode} onChange={this.handlePostalCodeChange}/>
              <label htmlFor="generatedPostalCode" className="active">Postal Code *</label>
            </div>
          </div>
        )}



    return (
      <div className='text-align center'>
        <Button onClick={this.backToCategories}>Back</Button>

        <div className="container">
          <div className="section">
            <h5>Where is the {this.props.reportType}?</h5>
            <div className="row">
              <form className="col s12">
                {reverseGeolocation()}

                <h5>How bad is the {this.props.reportType}?</h5>
                <div className="text-align center col offset-s3 s6 m6">
                <h6>Please select from the options below *</h6>
                  <p>
                    <input ref="level" type="radio" name="level" id="low" onClick={this.handleLow}/>
                    <label htmlFor="low">Low</label>
                  </p>
                  <p>
                    <input ref="level" type="radio" name="level" id="mild" onClick={this.handleMild}/>
                    <label htmlFor="mild">Mild</label>
                  </p>
                  <p>
                    <input ref="level" type="radio" name="level" id="medium" onClick={this.handleMedium}/>
                    <label htmlFor="medium">Medium</label>
                  </p>
                  <p>
                    <input ref="level" type="radio" name="level" id="extensive" onClick={this.handleExtensive}/>
                    <label htmlFor="extensive">Extensive</label>
                  </p>
                </div>
                <div className="text-align center col s12 m6">
                <h6>Please enter more information as needed</h6>
                  <div className="input-field">
                    <textarea id="moreInfo" ref="moreInfo" className="materialize-textarea"></textarea>
                  </div>
                </div>

                  {/* <div className="file-field input-field col s12" >
                    <div className="btn">
                      <span>Upload Photo</span>
                      <input type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div> */}

                <div className="row">
                  <h5 className="col s12">Your Contact Details</h5>
                  <div className="input-field col s12">
                    <input ref="name" id="name" type="text" className="validate" defaultValue={this.props.name}/>
                    <label htmlFor="name" className="active">Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input ref="phone" id="phone" type="text" className="validate" defaultValue={this.props.phone}/>
                    <label htmlFor="phone" className='active'>Phone Number</label>
                  </div>
                </div>
                <div className="row">
                    <div className="input-field inline col s12">
                      <input ref="email" id="email" type="email" className="validate" defaultValue={this.props.email}/>
                      <label htmlFor="email" data-error="wrong" data-success="valid" className="active">Email</label>
                    </div>
                </div>

              </form>
            </div>

            <a onClick={this.submitReport} className="waves-effect waves-light btn">submit</a>

          </div>
        </div>

        <footer className="page-footer teal">
        </footer>

      </div>
    )
  }
}

export default ReportForm

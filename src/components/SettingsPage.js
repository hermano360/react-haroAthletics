import React, {Component} from 'react'
import {Button,Col} from 'react-materialize'

class SettingsPage extends Component {
  constructor(){
    super()
    this.closeSettings=this.closeSettings.bind(this);
    this.clearSettings=this.clearSettings.bind(this);
    this.returnToSummary=this.returnToSummary.bind(this);
  }
  closeSettings(){
    this.props.returnToSummary()
  }
  clearSettings(){
    localStorage.removeItem('aquaName');
    localStorage.removeItem('aquaPhone');
    localStorage.removeItem('aquaEmail');
    this.props.clearInfo();
    this.props.returnToSummary();
  }

  returnToSummary(){
    localStorage.setItem('aquaName',this.refs.name.value);
    localStorage.setItem('aquaPhone',this.refs.phone.value);
    localStorage.setItem('aquaEmail',this.refs.email.value);
    this.props.returnToSummary(this.refs.name.value,this.refs.email.value,this.refs.phone.value)
  }

  render(){
    return (
      <div className='text-align center'>
        <Button>Information </Button>
        <form className="col s12 text-align center">
          <div className="row">
            <div className="input-field col s12">
              <input id="name" ref="name" type="text" className="validate" defaultValue = {this.props.name}/>
              <label htmlFor="name" className="active">Update your Name</label>
            </div>
            <div className="input-field col s12">
              <input id="email" ref="email" type="email" className="validate" defaultValue = {this.props.email}/>
              <label htmlFor="email" className="active">Update your Email</label>
            </div>
            <div className="input-field col s12">
              <input id="phone" ref="phone" type="tel" className="validate" defaultValue = {this.props.phone}/>
              <label htmlFor="phone" className="active">Update your Phone</label>
            </div>
          </div>
        </form>

        <div>
          <Col s={6} style={{display:'inline', margin:'0 10px'}}><Button onClick={this.returnToSummary}>Update</Button></Col>
          <Col s={6} style={{display:'inline', margin:'0 10px'}}><Button onClick={this.closeSettings}>Cancel</Button></Col>
          <Col s={6} offset="s3" style={{display:'inline', margin:'10px 10px'}}><Button className="red" onClick={this.clearSettings} style={{margin:'10px 10px'}}>Log Out</Button></Col>
        </div>
      </div>
    )
  }
}


export default SettingsPage

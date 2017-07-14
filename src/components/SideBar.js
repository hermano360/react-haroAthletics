import React, {Component} from 'react'
import {Button} from 'react-materialize'
import InfoPage from './InfoPage'
import SettingsPage from './SettingsPage'
import Icons from './Icons'

class SideBar extends Component {
  constructor(){
    super()
    this.handleIcons = this.handleIcons.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.returnToSummary = this.returnToSummary.bind(this);
    this.state = {
      screen:'summary'
    }
  }
  handleIcons(){
    this.setState({
      screen:'icons'
    })
  }
  handleInfo(){
    this.setState({
      screen:'info'
    })
  }
  handleSettings(){
    this.setState({
      screen:'settings'
    })
  }
  returnToSummary(name,email,phone){
    this.props.updateUserInfo(name,email,phone);
    this.setState({
      screen:'summary'
    })
  }
  componentDidMount(){
  }


  render(){
    const sideViewContent = ()=>{
      switch(this.state.screen){
        case 'summary':
          return (
            <div>
              <li><div className="userView">
                <img src="./logo.jpg" alt={this.props.name} ></img>

                <a><span className="name">{this.props.name}</span></a>
                <a><span className="email">{this.props.email}</span></a>
                <a><span className="email">{this.props.phone}</span></a>
              </div></li>
              <li onClick={this.handleIcons}><a ><i className="material-icons" >card_giftcard</i>See Your Awards</a></li>
              <li onClick={this.handleInfo}><a ><i className="material-icons" >info</i>Information</a></li>
              <li><div className="divider"></div></li>
              <li onClick={this.handleSettings}><a href="#!"><i className="material-icons">settings</i>Update Information</a></li>
            </div>
          )
          break;
          case 'icons':
            return (
              <Icons returnToSummary= {this.returnToSummary}/>
            )
            break;
            case 'info':
              return (
                <InfoPage returnToSummary= {this.returnToSummary}/>
              )
              break;
              case 'settings':
                return (
                <SettingsPage returnToSummary= {this.returnToSummary} name={this.props.name} phone={this.props.phone} email={this.props.email} clearInfo = {this.props.clearInfo}/>
                )
                break;
        default:
          return (
            <Icons/>
          )
        }
    }


    return (
    <ul id="slide-out" className="side-nav">
      {sideViewContent()}
    </ul>
  )
}
}


export default SideBar

import React, {Component} from 'react'
import {Button} from 'react-materialize'

class InfoPage extends Component {
  constructor(){
    super()
    this.returnToSummary = this.returnToSummary.bind(this)
  }
  returnToSummary(){
    this.props.returnToSummary()
  }


  render(){

    return (
      <div className='text-align center'>
        <Button>Information </Button>
        <h5>
          Welcome to AquaData!
        </h5>
        <p>
          You can use this application to report common water related problems.
        </p>
        <p>
          You can choose to update a photo and give contact information to greatly
          help the city respond to problems in a much better way.
        </p>
        <p>
          If you can point to the locaiton on the map, simply click on the map to
          produce a pin and continue by clicking on the Report button.
        </p>
        <p>
          If you only have the address or latitude/longitude, simply click on the
          report button to continue reporting
        </p>
        <Button onClick={this.returnToSummary}>Return </Button>
      </div>
    )
  }
}


export default InfoPage

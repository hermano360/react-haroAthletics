import React, {Component} from 'react'
import {Button,Row} from 'react-materialize'

let conditions = {
  Infrastructure: ['Aging Pipe', 'Leak','Damage'],
  Environmental: ['Drought', 'Contamination', 'Storm Water Run Off',"Spill"],
  Health: ['Unusual Symptom', 'Sickness', 'outbreak']
}
let conditionsStyle = {padding:'0 10px',margin:'5px 10px'};
let conditionsClass = "grey";

class MiddlePage extends Component {
  constructor(){
    super()
    this.chooseInfrastructure=this.chooseInfrastructure.bind(this);
    this.chooseEnvironmental=this.chooseEnvironmental.bind(this);
    this.chooseHealth=this.chooseHealth.bind(this);
    this.chooseFirst=this.chooseFirst.bind(this);
    this.chooseSecond=this.chooseSecond.bind(this);
    this.chooseThird=this.chooseThird.bind(this);
    this.chooseFourth=this.chooseFourth.bind(this);
    this.state={
      category:"",
      option:""
    }

  }
  chooseInfrastructure(){
    this.setState({
      category:'Infrastructure'
    })
    // this.props.chooseReport()
  }
  chooseEnvironmental(){
    this.setState({
      category:'Environmental'
    })
    //this.props.chooseReport()
  }
  chooseHealth(){
    this.setState({
      category:'Health'
    })
    //this.props.chooseReport()
  }

  chooseFirst(){
    this.props.chooseReport(conditions[this.state.category][0],this.state.category)
  }
  chooseSecond(){
    this.props.chooseReport(conditions[this.state.category][1],this.state.category)
  }
  chooseThird(){
    this.props.chooseReport(conditions[this.state.category][2],this.state.category)
  }
  chooseFourth(){
    this.props.chooseReport(conditions[this.state.category][3],this.state.category)
  }

  render(){
    const infrastructureOption =() =>{
      let optionsInfrastructure = (<div></div>)
      if(this.state.category==='Infrastructure'){
        optionsInfrastructure = (<div>
          <Button style={conditionsStyle} className={`col sm4 ${conditionsClass}`} onClick={this.chooseFirst}>Aging Pipes</Button>
          <Button style={conditionsStyle} className={`col sm4 ${conditionsClass}`} onClick={this.chooseSecond}>Leaks</Button>
          <Button style={conditionsStyle} className={`col sm4 ${conditionsClass}`} onClick={this.chooseThird}>Damages</Button>
        </div>)
      }
      return(
        <div>
      <div className="col s12 m7" onClick={this.chooseInfrastructure}>
        <div className="card horizontal hoverable">
          <div className="card-image">
            <img  src="./icon2.png"/>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">Infrastructure</span>
              <p>aging pipes, leaks, damages</p>
            </div>
            <div className="card-action">
              <a className="right-align teal-text text-lighten-4" href="#">Report</a>
            </div>
          </div>
        </div>
      </div>
      {optionsInfrastructure}
    </div>
)
    }
    const environmentalOption =() =>{
      let optionsEnvironmental = (<div></div>)
      if(this.state.category==='Environmental'){
        optionsEnvironmental = (<div>
          <Button style={conditionsStyle} className={`col sm3 ${conditionsClass}`} onClick={this.chooseFirst}>Drought</Button>
          <Button style={conditionsStyle} className={`col sm3 ${conditionsClass}`} onClick={this.chooseSecond}>Contamination</Button>
          <Button style={conditionsStyle} className={`col sm3 ${conditionsClass}`} onClick={this.chooseThird}>Storm Water Run Off</Button>
          <Button style={conditionsStyle} className={`col sm3 ${conditionsClass}`} onClick={this.chooseFourth}>Spills</Button>
        </div>)
      }
      return(
        <div>
        <div className="col s12 m7" onClick={this.chooseEnvironmental}>
          <div className="card horizontal hoverable">
            <div className="card-image">
              <img src="./icon1.png"/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Environmental</span>
                <p>
                drought, contamination, storm water run-off, spills</p>
              </div>
              <div className="card-action">
                <a className="right-align teal-text text-lighten-4" href="#">Report</a>
              </div>
            </div>
          </div>
        </div>
        {optionsEnvironmental}
      </div>
)
    }
    const healthOption =() =>{
      let optionsHealth = (<div></div>)
      if(this.state.category==='Health'){
        optionsHealth = (
          <div>
            <Button className={`col sm4 ${conditionsClass}`} style={conditionsStyle} onClick={this.chooseFirst}>Unusual Symptoms</Button>
            <Button className={`col sm4 ${conditionsClass}`} style={conditionsStyle} onClick={this.chooseSecond}>Sickness</Button>
            <Button className={`col sm4 ${conditionsClass}`} style={conditionsStyle} onClick={this.chooseThird}>Outbreaks</Button>
          </div>
        )
      }
      return(
        <div>
        <div className="col s12 m7" onClick={this.chooseHealth}>
          <div className="card horizontal hoverable">
            <div className="card-image">
              <img  src="./icon3.png"/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Health</span>
                <p>unusual symptoms, sickness, outbreaks</p>
              </div>
              <div className="card-action">
                <a className="right-align teal-text text-lighten-4" href="#">Report</a>
              </div>
            </div>
          </div>
        </div>
        {optionsHealth}
      </div>
)
    }


    return (
      <div className='text-align center'>


      <h5>What would you like to report?</h5>

      {infrastructureOption()}
      {environmentalOption()}
      {healthOption()}
      <br/>
      <Button onClick={this.props.returnHome}>Back</Button>

      </div>
    )
  }
}

export default MiddlePage

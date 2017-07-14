import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker,InfoWindow } from 'react-google-maps'
import superagent from 'superagent'

class Map extends Component {
  constructor(){
    super()
    this.state = {
      incidents:[],
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(e){
    let markersWithInfoWindow = this.props.markers.map(marker=>{
      let newMarker = {};
      for(let prop in marker){
        newMarker[prop] = marker[prop];
      }
      newMarker['showInfo']= e.latLng.lat()==marker.lat;
      return newMarker
    })
    this.props.updateMarkers(markersWithInfoWindow)
  }



  render(){
    const mapContainer = <div style={{height: '100%', width:'100%'}}></div>
    let that=this;
    const markers = this.props.markers.map((incident,i)=>{
      const marker = {
        position: {
          lat:parseFloat(incident.lat),
          lng:parseFloat(incident.lng)
        },
        showInfo:incident.showInfo
      };
      let testHTML = `<b>THIS IS A TEST</b>`
      let image = {};
      image.origin = new google.maps.Point(0,0);
      image.anchor = new google.maps.Point(12.5,12.5);
      image.scaledSize  = new google.maps.Size(25,25);
      switch(incident.category) {
        case 'Health':
          image.url = 'newicons_i1c.png';
          break;
        case 'Environmental':
          image.url = 'newicons_i1a.png';
          break;
        case 'Infrastructure':
          image.url = 'newicons_i1b.png';
          break;
        default:
          break;
      }

    return (
      <Marker draggable={false} icon ={image} key = {i} {...marker} onClick={that.onMarkerClick}>
        {marker.showInfo && (
          <InfoWindow>
            <div>
              <p>Report Type: <b>{incident.category}</b> - <b>{incident.reportType}</b></p>
              <p>Report Date: <b>{incident.date}</b></p>
              <p>Severity Level: <b>{incident.level}</b></p>
              <p>Reported By: <b>{incident.name}</b></p>
            </div>
          </InfoWindow>
        )

        }

    </Marker>)
  })


    return (
      <div style={{height:"100%", width:'100%'}}>
      <GoogleMapLoader
        containerElement = {mapContainer}
        googleMapElement = {
          <GoogleMap
          defaultZoom={14}
          defaultCenter={this.props.center}
          options={{
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.LEFT_BOTTOM
          }}}
          onClick={this.props.onMapClick}>
          {markers}
          </GoogleMap>
        } />
        </div>






    )
  }
}

export default Map

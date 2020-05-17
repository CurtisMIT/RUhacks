import React, { useEffect } from 'react';
import { withAuthorization } from './Session';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import axios from 'axios';
var latval = 43.6426;
var longval = -79.3871;
var newMarkers = [];
var info = [];

function Map() {
    return (
        <GoogleMap defaultZoom={15} defaultCenter={{lat: latval, lng: longval}}>
            <Marker position={{lat: latval, lng: longval}}/>
            {newMarkers.map(ticket => (
                <Marker position={{lat: ticket._lat, lng: ticket._long}}/>
            ))}
        </GoogleMap>
    )
}

function geoLocationInit(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,fail);
        } 
        else {
            alert('can not get current location!');
        }
    }

const WrappedMap = withScriptjs(withGoogleMap(Map));

function success(position){
    console.log(position);
    latval=position.coords.latitude;
    longval=position.coords.longitude;
}

function fail(){
   alert("fail");
}

function deleteItem(element){
    
      info.splice(element);
    
  }


function Helper(){
    geoLocationInit();
    

    useEffect(() => {

        axios.get("/api/users/").then(data => {
          console.log(data.dataid, data.data)
          data.data.arr.forEach(element => {
            if(element.data.location){
                 console.log(element.dataid);
                 info.push(element)
                //  info2.puch(element.dataid)

                newMarkers.push(element.data.location);
          }
          });
        })
    })


    for (var i = 0; i < info.length; i++) {
        console.log(info[i]);
      }
    return (
        <div className="text-center">
            <h1 className="display-1 mb-3">
                Nearby
            </h1>
            <div className="container" style={{ height: `80vh`, width: "100vw" }}>
                <WrappedMap 
                    googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6uhMDA9rSNZIe5KZpCOexHDgzaewn9LQ&AIzaSyB6uhMDA9rSNZIe5KZpCOexHDgzaewn9LQ'}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            <h1 className="display-3 my-5">
                View All
            </h1>
            {/* <div className="container">
                <div className="row">
                    <ul className="list-group list-group-flush text-center mx-auto">
                        {info.map(ticket => (
                            <li className="list-group-item">
                                <div className="row mx-auto">
                                    Name: {ticket.data.helpme}  
                                </div>
                                <div className="row mx-auto my-3">
                                    Order: {ticket.data.order}
                                </div>
                                <button onClick={deleteItem(ticket)} >Completed</button>
                            </li>
                        ))}
                        <li className="list-group-item">
                            
                        </li>
                    </ul>
                </div>
            </div> */}
        </div> 
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Helper);

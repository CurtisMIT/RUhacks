import React from 'react';
import { withAuthorization } from './Session';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

var latval = 43.6426;
var longval = -79.3871;

function Map() {
    return (
        <GoogleMap defaultZoom={15} defaultCenter={{lat: latval, lng: longval}}>
            <Marker position={{lat: latval, lng: longval}}/>
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

function Helper(){
    geoLocationInit();

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
            <h1 className="display-3 mt-5">
                View All
            </h1>
            <div className="container">
                <div className="row">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="card" style={{width: '18rem'}}>
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    Hello there
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Helper);
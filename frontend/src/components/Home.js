import React from 'react';
import { withAuthorization } from './Session';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat: 43.6426, lng: -79.3871}}/>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


function Home(){
    return (
        <div style={{ height: `100vh`, width: "100vw" }}>
            <WrappedMap 
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6uhMDA9rSNZIe5KZpCOexHDgzaewn9LQ&AIzaSyB6uhMDA9rSNZIe5KZpCOexHDgzaewn9LQ'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
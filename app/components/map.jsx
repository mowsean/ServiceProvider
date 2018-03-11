import React, { Component } from 'react';
import './map.css';
import GoogleMap from 'google-map-react';

class Mapp extends Component {
 
    componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 13,
            mapTypeId: 'roadmap',
        });
    }

    render() {
        return (
            <div id="root">
                <div id='app'>
                    <div id='map' />
                </div>
            </div>
        );
    } 
}

export default Mapp;
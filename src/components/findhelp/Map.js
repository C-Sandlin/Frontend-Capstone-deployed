import L from 'leaflet';
import React, { Component } from "react";
import { mapboxAPIkey } from "../db/hiddenKey"

var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});





export default class Map extends Component {

    map = null;


    componentDidMount() {

        //create original view of map when loaded, set to generic Tennessee Coordinates and a (not very close zoom)
        this.map = L.map('map').setView([35.860119, -86.660156], 8);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(yourPosition => {
                let coords = yourPosition.coords;
                L.marker([coords.latitude, coords.longitude], { icon: redIcon }, 12)
                    .bindPopup('This is your <strong>current location</strong>')
                    .addTo(this.map);
            })
        }

        // get the tiles from open source maps (this is just the base layer of map tiles combined.)
        L.tileLayer('https://api.mapbox.com/styles/v1/csandlin010/cjwwgtxl636bg1cphchbfirr1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3NhbmRsaW4wMTAiLCJhIjoiY2p3dzhoZXJiMGhhcTQ5bnRraXRqbHk1dyJ9.Ra3al6vYoRySE9W33sYI1A', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: mapboxAPIkey
        }).addTo(this.map);


        if (this.props.resultsReceived === true) {

            this.map.setView([this.props.coords[0], this.props.coords[1]], 12);

            this.props.locationResults.map(location => {
                return L.marker([location.position[0], location.position[1]])
                    .bindPopup(`<h6>${location.title}</h6><p>${location.vicinity}</p>`)
                    .addTo(this.map);
            })
        }


    }

    render() {
        return (
            <>
                <div id="map" ></div >
            </>
        )
    }
}
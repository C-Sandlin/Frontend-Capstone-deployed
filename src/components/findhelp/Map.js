import L from 'leaflet';
import React, { Component } from "react";
import { mapboxAPIkey } from "../db/hiddenKey"




export default class Map extends Component {

    map = null;


    componentDidMount() {
        //create original view of map when loaded, set to generic Tennessee Coordinates and a (not very close zoom)
        this.map = L.map('map').setView([35.860119, -86.660156], 8);
        L.marker([36.132930, -86.756625])
            .bindPopup('This is your current <strong>location</strong>')
            .addTo(this.map);

        // get the tiles from open source maps (this is just the base layer of map tiles combined.)
        L.tileLayer('https://api.mapbox.com/styles/v1/csandlin010/cjwwgtxl636bg1cphchbfirr1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3NhbmRsaW4wMTAiLCJhIjoiY2p3dzhoZXJiMGhhcTQ5bnRraXRqbHk1dyJ9.Ra3al6vYoRySE9W33sYI1A', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: mapboxAPIkey
        }).addTo(this.map);


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let coords = position.coords;
                this.map.setView([coords.latitude, coords.longitude], 12);


                var markerOptions = {
                    riseOnHover: true,
                }

                this.props.locationResults.map(location => {
                    L.marker([location.position[0], location.position[1]], markerOptions)
                        .bindPopup(`<h6>${location.title}</h6><p>+1 (601) 285-3672</p><p>${location.vicinity}</p>`)
                        .addTo(this.map);
                })
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
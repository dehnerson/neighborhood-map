import React, { Component } from 'react';

class Map extends Component {
  render() {
    return(
      <div id='map'>
      </div>
    );
  }

  componentDidMount = () => {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAH9qb6X38U0FPzqM_QgLeQ7oT17fB1Sus&v=3&callback=initMap')
  }

  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {center: {lat: 40.7413549, lng: -73.9980244}, zoom: 13});
  }

  loadJS = (src) => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = src;
    document.getElementsByTagName('body').item(0).appendChild(script);
  }
}

export default Map;

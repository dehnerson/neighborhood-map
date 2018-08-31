import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired
  }

  state = {
    map: null
  }

  markers = []

  render() {
    this.updateMarkers();

    return(
      <div id='map'>
      </div>
    );
  }

  componentDidMount = () => {
    if(this.state.map) return;

    // Connect this instace to the global window context, so Google Maps can invoke it
    window.mapComp = this;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAH9qb6X38U0FPzqM_QgLeQ7oT17fB1Sus&v=3&callback=mapComp.onMapsAPILoaded')
  }

  onMapsAPILoaded = () => {
    window.mapComp.setState({map: new window.google.maps.Map(document.getElementById('map'), {center: {lat: 50.13543, lng: 8.73895}, zoom: 13})});
  }

  updateMarkers = () => {
    if(!this.state.map) return;

    this.deleteMarkers();

    this.props.locations.forEach((location) => {
      this.markers.push(new window.google.maps.Marker({
                          position: location.position,
                          map: this.state.map,
                          title: location.name
                        }))
    });
  }

  deleteMarkers = () => {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.markers = [];
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

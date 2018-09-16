import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  static propTypes = {
    sidebarShowing: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    infoLocation: PropTypes.object,
    displayInfoLocation: PropTypes.func.isRequired
  }

  state = {
    map: null
  }

  markers = []

  render() {
    if(this.state.map) {
      this.updateMarkers();
      this.showInfoLocation();
    }

    return(
      <div id='map' className={this.props.sidebarShowing ? 'map map-split' : 'map map-full'}>
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
    const locations = this.props.locations;
    const markers = this.markers;
    const map = this.state.map;
    const displayInfoLocation = this.props.displayInfoLocation;

    // Check if displayed markers are still valid.
    // If not, hide them!
    markers.forEach((marker) => {
      const location = locations.find((location) => {
        return marker.title === location.name;
      });

      if(!location) {
        marker.setMap(null);
      }
    });

    // Check if there are new markers to be created, or hidden ones to be displayed again.
    locations.forEach((location) => {
      let marker = markers.find((marker) => {
        return marker.title === location.name;
      });

      if(!marker) {
        marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.name
        });

        marker.addListener('click', function() {
          displayInfoLocation(location);
        });

        markers.push(marker);
      }
      else if(!marker.map) {
        marker.setMap(map);
      }
    });
  }

  showInfoLocation = () => {
    if(!this.infoWindow) {
      this.infoWindow = new window.google.maps.InfoWindow();

      const displayInfoLocation = this.props.displayInfoLocation;

      this.infoWindow.addListener('closeclick', function() {
        displayInfoLocation(null);
      });
    }

    if(this.props.infoLocation) {
      const marker = this.markers.find((marker) => {
        return this.props.infoLocation.name === marker.title;
      });

      if(!marker) return;

      if(!this.infoWindow.anchor || this.infoWindow.anchor !== marker) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(()=> {marker.setAnimation(null)}, 990);

        this.infoWindow.open(this.state.map, marker);

        this.infoWindow.setContent('<div class="loader-wrapper"> <div class="loader"></div> </div>');

        this.loadInfoWindowInformation(this.props.infoLocation.name).then((info) => {
          this.infoWindow.setContent(info);
        });
      }
    }
  }

  loadInfoWindowInformation = (name) => {
    return fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search='+name+'&format=json&formatversion=2&origin=*').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error( 'Network response was not ok: ' + response.statusText );
    }).then((jsonData) => {
      return '<div id="info-window-content">'+
        '<h3>'+jsonData[1][0]+'</h3>'+
        '<p>'+jsonData[2][0]+'</p>'+
        '<span>Further information: <a href='+jsonData[3][0]+' target=blank>'+jsonData[3][0]+'</a></span>'+
        '</div>';
    }).catch((error) => {
      console.log(error);
    });
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

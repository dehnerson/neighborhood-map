import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  locations = [
    {name: 'Batschkapp', position: {lat: 50.13543, lng: 8.73895}},
    {name: 'Commerzbank-Arena', position: {lat: 50.0685807, lng: 8.645472}},
    {name: 'Frankfurt Zoological Garden', position: {lat:50.115835, lng:  8.6995448}},
    {name: 'Günthersburgpark', position: {lat:50.1298259, lng: 8.7009022}},
    {name: 'Messe Frankfurt', position: {lat:50.1110660, lng: 8.6455540 }},
    {name: 'Palmengarten Frankfurt', position: {lat:50.1227338, lng: 8.6582298}},
    {name: 'Rebstockgelände', position: {lat:50.1130657, lng: 8.6252221}},
  ]

  state = {
    currentLocations: this.locations,
    infoLocation: null,
    showSidebar: false
  }

  render() {
    return (
      <div className="App">
        <div className='App-bar'>
          <div className='menu-link-wrapper' onClick={(event) => this.setState((prevState)=>({showSidebar: !prevState.showSidebar}))}>
            <div className={this.state.showSidebar ? 'menu-link, menu-trigger-open' : 'menu-link'}>
              <span className="lines"></span>
            </div>
          </div>
          <h1>Neighborhood Map</h1>
        </div>
        <LocationList show={this.state.showSidebar} locations={this.state.currentLocations} filterLocations={this.filterLocations}/>
        <Map locations={this.state.currentLocations}/>
        <LocationList show={this.state.showSidebar} locations={this.state.currentLocations} filterLocations={this.filterLocations} infoLocation={this.state.infoLocation} displayInfoLocation={this.displayInfoLocation}/>
        <Map sidebarShowing={this.state.showSidebar} locations={this.state.currentLocations} infoLocation={this.state.infoLocation} displayInfoLocation={this.displayInfoLocation}/>
      </div>
    );
  }

  filterLocations = (query) => {
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({currentLocations: this.locations.filter((location) => match.test(location.name))});
    }
    else {
      this.setState({currentLocations: this.locations});
    }
  }

  displayInfoLocation = (location) => {
    this.setState({infoLocation: location});
  }
}

export default App;

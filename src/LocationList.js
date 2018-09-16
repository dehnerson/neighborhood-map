import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocationList extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    filterLocations: PropTypes.func.isRequired,
    infoLocation: PropTypes.object,
    displayInfoLocation: PropTypes.func.isRequired
  }

  render() {
    return(
      <div id='sidebar' className={this.props.show ? undefined : 'sidebar-hidden'}>
        <div className='location-list-top'>
          <input type='text' placeholder='Filter'
            onChange={(event) => this.props.filterLocations(event.target.value)}
          />
        </div>

        <ul className='location-list'>
          {this.props.locations.map((location) => (
            <li key={location.name} className={this.props.infoLocation === location ? 'location-list-item location-list-item-emphasized' : 'location-list-item'}
              onClick={(event) => this.props.displayInfoLocation(location)}>
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LocationList;

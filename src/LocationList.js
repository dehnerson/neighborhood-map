import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocationList extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    locations: PropTypes.array.isRequired,
    filterLocations: PropTypes.func.isRequired
  }

  render() {
    return(
      <div id='sidebar' className={this.props.show ? undefined : 'sidebar-hidden'}>
        <div className='location-list-top'>
          <input className='search-contacts' type='text' placeholder='Filter'
            onChange={(event) => this.props.filterLocations(event.target.value)}
          />
        </div>

        <ul className='location-list'>
          {this.props.locations.map((location) => (
            <li key={location.name} className='contact-list-item'>
              <p>{location.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LocationList;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DG from '2gis-maps';

import axios from 'axios';

import { addMarker, saveMarkers, getMarkers } from 'actions/markers';

class Map extends Component {
  constructor(props) {
    super(props);

    this.customIcon = DG.icon({
      iconUrl: '/images/map-marker.png',
      iconSize: [20, 20],
      iconAnchor: [10, 20]
    });

    this.showMarker = this.showMarker.bind(this);

    this.onMapClick = this.onMapClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onGetClick = this.onGetClick.bind(this);

    this.onCategoryClick = this.onCategoryClick.bind(this);
  }

  componentDidMount() {
    this.map = DG.map('map', {
      center: [46.44495436541506, 31.01914672851563],
      zoom: 11
    });

    this.map.locate();

    this.map.on({
      click: this.onMapClick,
      locationfound: (location) => {
        this.map.setView(location.latlng, 17);
      }
    });

    this.props.markers.collection.map(marker => this.showMarker(marker));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers.collection.length === this.props.markers.collection.length) {
      return;
    }

    this.map.eachLayer(layer => layer.remove);
    nextProps.markers.collection.map(marker => this.showMarker(marker));
  }

  showMarker(marker, options = {}) {
    return DG.marker(marker, options).addTo(this.map);
  }

  onMapClick(e) {
    if (e.originalEvent.target.className.includes('leaflet-marker-icon')) {
      return;
    }

    const { user, addMarker } = this.props;

    if (!user.isAuthenticated) {
      return;
    }

    const { username } = user;
    const { lat, lng } = e.latlng;

    const marker = { username, lat, lng };

    this.showMarker(marker);
    addMarker(marker);
  }

  onSaveClick() {
    const { saveMarkers, user, markers } = this.props;

    saveMarkers(user, markers.collection.filter(({ _id }) => !_id));
  }

  onGetClick() {
    const { getMarkers, user } = this.props;

    getMarkers(user);
  }

  onCategoryClick(q) {
    return () => {
      axios.get('https://catalog.api.2gis.ru/2.0/catalog/marker/search?page=1&page_size=10000&q='+q+'&region_id=14&viewpoint1=30.228881835937504%2C46.59614683179579&viewpoint2=31.231384277343754%2C46.34597963322759&key=rutnpt3272')
      .then((response) => {
        response.data.result.items.map(({ lat, lon }) => this.showMarker([
          lat,
          lon
        ], {
          icon: this.customIcon
        }));
      })
      .catch((error) => {
        console.error.bind(error);
        alert('Geo search error');
      });
    };
  }

  render() {
    const { user, markers } = this.props;
    const mapControls = user.isAuthenticated ? (
      <p>
        <button onClick={this.onSaveClick} disabled={markers.isSyncing || !markers.collection.length}>Save markers</button>
        <button onClick={this.onGetClick} disabled={markers.isSyncing}>Get markers</button>
      </p>
    ) : (
      <p><Link to="/login">Log in </Link> to create and save your markers.</p>
    );

    return (
      <div className="map-container">

        <div className="map" id="map" style={{height: '600px'}}>Loading map...</div>
        {mapControls}
        <div className="map-legend">
          <ul className="map-categories-list">
            <li className="map-category" onClick={this.onCategoryClick('Новостройки')}><span>Newbuilding projects</span></li>
            <li className="map-category" onClick={this.onCategoryClick('Гостиницы')}><span>Hotels</span></li>
            <li className="map-category" onClick={this.onCategoryClick('Спорттовары')}><span>Sports</span></li>
            <li className="map-category" onClick={this.onCategoryClick('Поесть')}><span>Food</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, markers }) => ({ user, markers });
const mapDispatchToProps = { addMarker, saveMarkers, getMarkers };

export default connect(mapStateToProps, mapDispatchToProps)(Map);
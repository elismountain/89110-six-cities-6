import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cityPropType, offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map (props) {
  const {city, points} = props;
  const mapRef = useRef();

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39]
  })

  return (
    <div id="map"></div>
  );
};



export default Map;

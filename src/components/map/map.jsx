import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cityPropType, offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map () {
  return (
    <div id="map"></div>
  );
};



export default Map;

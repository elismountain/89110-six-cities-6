import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Cities, Coordinates} from '../../const';
import {offerPropType} from '../../prop-types';
// import {locationPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, activePin, className = `cities__map map`} = props;
  const coords = Coordinates[city];
  const [map, setMap] = useState(null);

  const mapRef = useRef();

  const defaultIcon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39]
  });

  const activeIcon = leaflet.icon({
    iconUrl: `img/pin-active.svg`,
    iconSize: [27, 39]
  });


  useEffect(() => {
    const nextMap = leaflet.map(mapRef.current, {
      center: [coords.latitude, coords.longitude],
      zoom: coords.zoom
    });

    leaflet
  .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
  }).addTo(nextMap);
    setMap(nextMap);

  }, []);


  useEffect(() => {
    if (map && points.length) {
      points.map((point) => {
        const icon = point.id === activePin
          ? activeIcon
          : defaultIcon;

        leaflet.marker(
            [point.location.latitude, point.location.longitude],
            {icon},
        ).addTo(map);
      });
    }
  }, [points, map, activePin]);


  return (
    <section className={className} style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: PropTypes.oneOf(Object.values(Cities)),
  className: PropTypes.string,
  activePin: PropTypes.number,
  points: PropTypes.arrayOf(offerPropType)
};

export default Map;

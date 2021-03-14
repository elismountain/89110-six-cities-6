import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, activeMarker, className = `cities__map map`} = props;
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
      center: [city.latitude, city.longitude],
      zoom: city.zoom
    });

    leaflet
  .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
  }).addTo(nextMap);
    setMap(nextMap);

  }, [points]);


  useEffect(() => {
    if (map && points.length) {
      points.map((point) => {
        const icon = point.id === activeMarker
          ? activeIcon
          : defaultIcon;

        leaflet.marker(
            [point.location.latitude, point.location.longitude],
            {icon},
        ).addTo(map);
      });
    }
  }, [points, map, activeMarker]);


  return (
    <section className={className} style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: offerPropType,
  className: PropTypes.string,
  activeMarker: PropTypes.string,
  points: PropTypes.arrayOf(offerPropType)
};

export default Map;

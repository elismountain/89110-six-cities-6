import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {cityPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, activeMarker, className = `cities__map map`} = props;
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);

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
    if (!map) {
      const nextMap = leaflet.map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom
      });

      leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(nextMap);
      setMap(nextMap);
    }
  }, [points]);


  useEffect(() => {
    if (map) {
      if (points.length) {
        const pins = points.map((point) => {
          return leaflet
          .marker([point.location.latitude, point.location.longitude], {defaultIcon})
          .addTo(map);
        });


        setMarkers(pins);
      }
    }
  }, [points, map]);

  useEffect(() => {
    if (markers) {
      markers.forEach((marker) => {
        const isActive = marker.options.offerId === activeMarker;
        marker.setIcon(isActive ? activeIcon : defaultIcon);
      });
    }
  }, [markers, activeMarker]);


  return (
    <section className={className} style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: cityPropType,
  className: PropTypes.string,
  activeMarker: PropTypes.number,
  points: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }))
};

export default Map;

import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cityPropType, offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, className = `cities__map map`} = props;
  const mapRef = useRef();

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39]
  });

  useEffect(() => {
    mapRef.current = leaflet.map(mapRef.current, {
      center: [city.location.latitude, city.location.longitude],
      zoom: city.location.zoom
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    points.forEach((point) => {
      leaflet
        .marker([point.location.latitude, point.location.longitude], {icon})
        .addTo(mapRef.current)
        .bindPopup(point.title);
    });

    return () => {
      mapRef.current.remove();
    };

  }, [points]);

  return (
    <section className={className} style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: cityPropType,
  points: PropTypes.arrayOf(offerPropType),
  className: PropTypes.string,
};



export default Map;

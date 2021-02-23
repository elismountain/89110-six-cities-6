import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {cityPropType, offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, activePoint, className = `cities__map map`} = props;

  const mapRef = useRef();

  const simpleIcon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [27, 39]
  });

  const activeIcon = leaflet.icon({
    iconUrl: `img/pin-active.svg`,
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

    return () => {
      mapRef.current.remove();
    };

  }, [city]);

  useEffect((map) => {
    const markers = [];

    points.forEach((point) => {
      const icon = (activePoint && (point.id === activePoint.id)) ? activeIcon : simpleIcon;

      markers.push(
        leaflet
          .marker([point.location.latitude, point.location.longitude], {icon})
          .addTo(mapRef.current)
          .bindPopup(point.title)
      );
    });

    return () => {
      markers.forEach((marker) => mapRef.current.removeLayer(marker));
    };

  }, [points, activePoint]);


  return (
    <section className={className} style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: cityPropType,
  points: PropTypes.arrayOf(offerPropType),
  className: PropTypes.string,
  activePoint: offerPropType
};



export default Map;

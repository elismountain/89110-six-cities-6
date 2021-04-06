import React, {useRef, useEffect} from 'react';

import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import {Cities, Coordinates} from '../../const';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map = (props) => {
  const {city, points, activePoint} = props;
  const coords = Coordinates[city];
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
    mapRef.current = leaflet.map(`map`, {
      center: [coords.latitude, coords.longitude],
      zoom: coords.zoom
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

  useEffect(() => {
    const markers = [];

    points.forEach((point) => {
      markers.push(
          leaflet
            .marker([point.location.latitude, point.location.longitude], {icon: simpleIcon})
            .addTo(mapRef.current)
            .bindPopup(`<a href="offer/${point.id}">${point.title}</a>`)
      );
    });

    return () => {
      markers.forEach((marker) => mapRef.current.removeLayer(marker));
    };

  }, [points]);

  useEffect(() => {
    let marker;

    if (activePoint) {
      marker = leaflet
        .marker([activePoint.location.latitude, activePoint.location.longitude], {icon: activeIcon})
        .addTo(mapRef.current)
        .bindPopup(`<a href="offer/${activePoint.id}">${activePoint.title}</a>`);
    }

    return () => {
      if (marker) {
        mapRef.current.removeLayer(marker);
      }
    };

  }, [activePoint]);

  return (
    <div id="map" style={{height: `100%`}}></div>
  );
};

Map.propTypes = {
  city: PropTypes.oneOf(Object.values(Cities)),
  points: PropTypes.arrayOf(offerPropType),
  activePoint: offerPropType
};

export default Map;

import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Cities, Coordinates} from '../../const';
import {offerPropType} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {city, points, activePin, className} = props;
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
      const markers = [];

      points.map((point) => {
        const icon = point.id === activePin
          ? activeIcon
          : defaultIcon;

        markers.push(
            leaflet
            .marker([point.location.latitude, point.location.longitude], {icon})
            .addTo(map)
        );

        map.panTo(new leaflet.LatLng(coords.latitude, coords.longitude));
      });
    }
  }, [points, map, activePin, coords]);


  return (
    <section className={`${className} map`} id="map" style={{height: `100%`}} ref={mapRef}></section>
  );
};

Map.propTypes = {
  city: PropTypes.oneOf(Object.values(Cities)),
  className: PropTypes.string,
  activePin: offerPropType,
  points: PropTypes.arrayOf(offerPropType)
};

export default Map;

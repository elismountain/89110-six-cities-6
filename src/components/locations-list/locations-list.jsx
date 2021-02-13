import React from 'react';
import PropTypes from 'prop-types';
import {Cities} from '../../const';

const LocationsList = (props) => {
  const {currentCity} = props;

  return (
    <ul className="locations__list tabs__list">
    {Object.values(Cities).map((city) => (
      <li className="locations__item" key={city}>
        <a className={`locations__item-link tabs__item ${city === currentCity ? `tabs__item--active` : ``}`} href="#">
          <span>{city}</span>
        </a>
      </li>
      ))}
    </ul>
  );
};


LocationsList.propTypes = {
  currentCity: PropTypes.string.isRequired
};

export default LocationsList;

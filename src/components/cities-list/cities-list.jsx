import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Cities} from '../../const';
import cn from 'classnames';

const CitiesList = (props) => {
  const {activeCity, setActiveCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities).map((city) => (
        <li className="locations__item" key={city} onClick={() => setActiveCity(city)}>
          <Link className={cn(`locations__item-link tabs__item`, {'tabs__item--active': city === activeCity})} to="/">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  activeCity: PropTypes.oneOf(Object.values(Cities)),
  setActiveCity: PropTypes.func.isRequired
};

export default {CitiesList};

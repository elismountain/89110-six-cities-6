import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Cities} from '../../const';
import cn from 'classnames';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const CitiesList = (props) => {
  const {activeCity, onChangeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities).map((city) => (
        <li className="locations__item" key={city} onClick={() => onChangeCity(city)}>
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
  onChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);

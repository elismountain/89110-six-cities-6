import React from 'react';
import PropTypes from 'prop-types';
import {Cities} from '../../const';


const MainEmpty = (props) => {
  const {activeCity} = props;

  return (
    <div className="cities__places-container container cities__places-container--empty">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
};

MainEmpty.propTypes = {
  activeCity: PropTypes.oneOf(Object.values(Cities)),
};

export default MainEmpty;

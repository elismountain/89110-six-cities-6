import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import {offerPropType} from '../../prop-types';
import MainOffers from '../main/main-offers';

import {Cities} from '../../const';
import {sortOffers} from '../../sorting';
import MainEmpty from '../main/main-empty';
import cn from 'classnames';

const Main = (props) => {
  const {cityOffers, activeCity} = props;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={cn(`page__main page__main--index`, {'page__main--index-empty': !cityOffers.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {cityOffers.length ?
            <MainOffers offers={cityOffers} activeCity={activeCity} />
            :
            <MainEmpty activeCity={activeCity} />
          }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  cityOffers: PropTypes.arrayOf(offerPropType),
  activeCity: PropTypes.oneOf(Object.values(Cities))
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  cityOffers: sortOffers(state.cityOffers, state.activeSorting)
});

export {Main};
export default connect(mapStateToProps)(Main);

import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import {offerPropType} from '../../prop-types';
import MainOffers from '../main/main-offers';
import {ActionCreator} from '../../store/action';

import {Cities, AppRoutes} from '../../const';
import {getActiveCity, getSortedCityOffers} from '../../store/main/selector';
import MainEmpty from '../main/main-empty';
import cn from 'classnames';

const Main = (props) => {
  const {activeCity, cityOffers, onChangeCity} = props;

  const history = useHistory();
  const location = useLocation();
  const cityParam = new URLSearchParams(location.search).get(`city`);

  useEffect(() => {
    if (!cityParam) {
      history.push({
        pathname: AppRoutes.MAIN,
        search: `?city=${activeCity}`
      });
    }
    if (cityParam && cityParam !== activeCity) {
      onChangeCity(cityParam);
    }
  }, [cityParam]);

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
  activeCity: PropTypes.oneOf(Object.values(Cities)),
  onChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  cityOffers: getSortedCityOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

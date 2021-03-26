import React, {useEffect} from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerPropType} from '../../prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';
import {getDataLoadedStatus, getFavoriteOffers} from '../../store/favorites/selector';
import {fetchFavorites} from '../../store/api-actions';

import {CardTypes} from '../../const';
import PlacesList from '../places-list/places-list';
import FavoritesEmpty from '../favorites/favorites-empty';
import Spinner from '../spinner/spinner';

const Favorites = (props) => {
  const {offers, onLoadData, isDataLoaded} = props;
  const isEmpty = !offers.length;

  useEffect(() => {
    onLoadData();
  }, []);

  const offersByCity = offers.reduce((acc, cur) => {
    acc[cur.city.name] = acc[cur.city.name] ? [...(acc[cur.city.name]), cur] : [cur];
    return acc;
  }, {});

  return (
    !isDataLoaded ?
      <Spinner />
      :
      <div className={cn(`page`, {'page--favorites-empty': isEmpty})}>
        <Header />

        <main className={cn(`page__main page__main--favorites`, {'page__main--favorites-empty': isEmpty})}>
          <div className="page__favorites-container container">
            {offers.length ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(offersByCity).map(([city, savedOffers]) => {
                    return (
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={`/?city=${city}`}>
                              <span>{city}</span>
                            </Link>
                          </div>
                        </div>
                        <PlacesList offers={savedOffers} cardType={CardTypes.FAVORITES}/>
                      </li>
                    );
                  })}
                </ul>
              </section>
              :
              <FavoritesEmpty />
            }
          </div>
        </main>
        <Footer />
      </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  onLoadData: PropTypes.func,
  isDataLoaded: PropTypes.bool
};

const mapStateToProps = (state) => ({
  offers: getFavoriteOffers(state),
  isDataLoaded: getDataLoadedStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchFavorites());
  }
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

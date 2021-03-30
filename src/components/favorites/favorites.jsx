import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';
import {connect} from 'react-redux';
import {getDataLoadedStatus, getFavoriteOffers} from '../../store/favorites/selector';
import {fetchFavorites} from '../../store/api-actions';
import Header from '../header/header';
import Footer from '../footer/footer';
import FavoritesEmpty from '../favorites/favorites-empty';
import FavoritesList from '../favorites/favorites-list';
import Spinner from '../spinner/spinner';

import cn from 'classnames';


const Favorites = (props) => {
  const {offers, onLoadData, isDataLoaded} = props;
  const isEmpty = !offers.length;

  useEffect(() => {
    onLoadData();
  }, []);

  return (
    !isDataLoaded ?
      <Spinner />
      :
      <div className={cn(`page`, {'page--favorites-empty': isEmpty})}>
        <Header />
        <main className={cn(`page__main page__main--favorites`, {'page__main--favorites-empty': isEmpty})}>
          <div className="page__favorites-container container">
            {isEmpty ? <FavoritesEmpty/> : < FavoritesList offers={offers}/>}
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

import React from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';
import {Link} from 'react-router-dom';
import PlacesList from '../places-list/places-list';
import {CardTypes} from '../../const';


const FavoritesList = (props) => {
  const {offers} = props;

  const offersByCity = offers.reduce((acc, cur) => {
    acc[cur.city.name] = acc[cur.city.name] ? [...(acc[cur.city.name]), cur] : [cur];
    return acc;
  }, {});

  return (
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
  );
};

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType)
};

export default FavoritesList;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import PlaceCard from '../place-card/place-card';
import LocationsList from '../locations-list/locations-list';
import {offerPropType} from '../../prop-types';

const Main = (props) => {
  const {currentCity, offers} = props;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!offers.length ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cities={cities} />
          </section>
        </div>
        <div className="cities">
        {offers.length
          ? <div className="cities__places-container container">
            <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offers.length} places to stay in {currentCity}</b>
              // вынести сортировку в отдельный компонент
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}>
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              // вынести офферы  в отдельный компонент
              <div className="cities__places-list places__list tabs__content">
                {Array(offers).fill().slice(0, 5).map((item) => <PlaceCard key={item}/>)}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType)
};

export default Main;

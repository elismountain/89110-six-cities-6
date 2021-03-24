import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const';

const PageNotFound = () => {
  return (
    <div className="page page--favorites-empty">
      <Header />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Page not found</b>
              <p className="favorites__status-description">Unfortunately the page you are looking for does not exist or there was an error in the link.</p>
              <p><Link to={AppRoutes.MAIN}>Go to main screen</Link></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageNotFound;

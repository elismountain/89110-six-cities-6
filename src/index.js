import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import offers from './mocks/offers';
import reviews from './mocks/reviews';
import currentCity from './const';


ReactDOM.render(
    <App
      currentCity={currentCity}
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);

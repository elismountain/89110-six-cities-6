import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import {createStore} from 'redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import offers from './mocks/offers';
import reviews from './mocks/reviews';

const store = createStore(
  reducer,
  composeWithDevTools()
);

ReactDOM.render(
    <App
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import {createStore, applyMiddleware} from 'redux';
import {ActionCreator} from './store/action';
import {checkAuth} from './store/api-actions';

import {reducer} from './store/main/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus} from './const';

import reviews from './mocks/reviews';
import {createAPI} from './services/api';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect)
));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App reviews={reviews} />
    </ Provider>,
    document.querySelector(`#root`)
);

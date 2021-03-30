import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {ActionCreator} from './store/action';
import {checkAuth} from './store/api-actions';
import {rootReducer} from './store/root-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthorizationStatus} from './const';
import {createAPI} from './services/api';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect)
));

store.dispatch(checkAuth()).then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </ Provider>,
      document.querySelector(`#root`)
  );
});

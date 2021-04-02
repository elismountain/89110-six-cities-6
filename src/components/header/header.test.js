import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import Header from './header';
import {AuthorizationStatus} from '../../const';
import {NameSpace} from '../../store/root-reducer';

const mockStore = configureStore({});

describe(`Header should render correctly`, () => {
  it(`Header should render correctly with unauthorized user`, () => {
    const history = createMemoryHistory();
    const {container} = render(
        <Provider store={mockStore({
          [NameSpace.USER]: {
            authorizationStatus: AuthorizationStatus.NO_AUTH,
            authInfo: {},
          }
        })}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Header should render correctly with authorized user`, () => {
    const history = createMemoryHistory();
    const {container} = render(
        <Provider store={mockStore({
          [NameSpace.USER]: {
            authorizationStatus: AuthorizationStatus.AUTH,
            authInfo: {email: `test@gmail.com`, name: `test`},
          }
        })}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

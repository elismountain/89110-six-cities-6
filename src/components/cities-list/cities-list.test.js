import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import CitiesList from './cities-list';
import {Cities} from '../../const';
import {NameSpace} from '../../store/root-reducer';

const mockStore = configureStore({});

it(`CitiesList should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Provider store={mockStore({
        [NameSpace.MAIN]: {
          activeCity: Cities.PARIS
        }
      })}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});


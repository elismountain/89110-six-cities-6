import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import BookmarkButton from './bookmark-button';
import {AuthorizationStatus} from '../../const';
import {NameSpace} from '../../store/root-reducer';
import {offerAdapted} from '../../store/offers/test-mocks';

const mockStore = configureStore({});

describe(`BookmarkButton should render correctly`, () => {
  it(`BookmarkButton should render correctly with authorized user`, () => {
    const history = createMemoryHistory();
    const {container} = render(
        <Provider store={mockStore({
          [NameSpace.USER]: {
            authorizationStatus: AuthorizationStatus.AUTH,
            authInfo: {email: `test@gmail.com`, name: `test`},
          }
        })}>
          <Router history={history}>
            <BookmarkButton offer={offerAdapted} />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

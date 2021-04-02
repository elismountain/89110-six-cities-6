import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {NameSpace} from '../../store/root-reducer';
import {AuthorizationStatus} from '../../const';
import {adaptOffersData} from '../../services/adapter';
import {favOffersRaw} from '../../store/favorites/test-mocks';
import {offerAdapted} from '../../store/offers/test-mocks';


const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Main' when user navigates to '/' url`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.MAIN]: {
        offers: [],
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();
    history.push(`/`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Cities`)).toBeInTheDocument();
  });


  it(`Render 'SignInScreen' when user navigates to '/login' url`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.MAIN]: {
        offers: [],
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();
    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`email`)).toBeInTheDocument();
    expect(screen.getByTestId(`password`)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigates to '/favorites' url`, async () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {email: `test@gmail.com`, name: `test`}
      },
      [NameSpace.MAIN]: {
        offers: [],
        isDataLoaded: true
      },
      [NameSpace.FAVORITES]: {
        offers: adaptOffersData(favOffersRaw),
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();
    history.push(`/favorites`);

    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
    });
  });

  it(`Render 'OfferScreen' when user navigates to '/offer/:id' url`, async () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.MAIN]: {
        offers: [],
        isDataLoaded: true
      },
      [NameSpace.OFFER]: {
        offer: offerAdapted,
        reviews: [],
        nearby: [],
        offerNotFound: false
      }
    });

    const history = createMemoryHistory();
    history.push(`/offer/1`);

    store.dispatch = () => Promise.resolve();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Canal View Prinsengracht`)).toBeInTheDocument();
      expect(screen.getByText(`Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`)).toBeInTheDocument();
    });
  });

  it(`Render 'PageNotFound' when user navigates to '/page-not-found' url`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {}
      },
      [NameSpace.MAIN]: {
        offers: [],
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();
    history.push(`/page-not-found`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(`Page not found`).length).toBe(2);
    expect(screen.getByText(`Go to main screen`)).toBeInTheDocument();
  });

});

import {reducer} from './reducer';
import {ActionType, ActionCreator} from '../action';
import {APIRoutes, Cities, SortingTypes} from '../../const';

import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {fetchOffers} from '../api-actions';
import {offersRaw} from './test-mocks';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {}))
      .toEqual({
        offers: [],
        activeCity: Cities.PARIS,
        activeSorting: SortingTypes.POPULAR,
        isDataLoaded: false
      });
  });

  it(`Reducer should update active city`, () => {
    const state = {
      offers: [],
      activeCity: Cities.PARIS,
      activeSorting: SortingTypes.POPULAR,
      isDataLoaded: false
    };

    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: `test`,
    };

    expect(reducer(state, changeCityAction))
      .toEqual({
        offers: [],
        activeCity: `test`,
        activeSorting: SortingTypes.POPULAR,
        isDataLoaded: false
      });
  });

  it(`Reducer should update active sorting`, () => {
    const state = {
      offers: [],
      activeCity: Cities.PARIS,
      activeSorting: SortingTypes.POPULAR,
      isDataLoaded: false
    };

    const changeSortingAction = {
      type: ActionType.CHANGE_SORTING,
      payload: `test`,
    };

    expect(reducer(state, changeSortingAction))
      .toEqual({
        offers: [],
        activeCity: Cities.PARIS,
        activeSorting: `test`,
        isDataLoaded: false
      });
  });

  it(`Reducer should add favorite offer`, () => {
    const state = {
      offers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: false}, {id: 3, isFavorite: false}],
      activeCity: Cities.PARIS,
      activeSorting: SortingTypes.POPULAR,
      isDataLoaded: true
    };

    const addFavoriteAction = {
      type: ActionType.ADD_FAVORITE,
      payload: {"id": 2, "is_favorite": true},
    };

    expect(reducer(state, addFavoriteAction))
      .toEqual({
        offers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: true}, {id: 3, isFavorite: false}],
        activeCity: Cities.PARIS,
        activeSorting: SortingTypes.POPULAR,
        isDataLoaded: true
      });
  });

  it(`Reducer should remove favorite offer`, () => {
    const state = {
      offers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: true}, {id: 3, isFavorite: true}],
      activeCity: Cities.PARIS,
      activeSorting: SortingTypes.POPULAR,
      isDataLoaded: true
    };

    const removeFavoriteAction = {
      type: ActionType.REMOVE_FAVORITE,
      payload: {"id": 2, "is_favorite": false},
    };

    expect(reducer(state, removeFavoriteAction))
      .toEqual({
        offers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: false}, {id: 3, isFavorite: true}],
        activeCity: Cities.PARIS,
        activeSorting: SortingTypes.POPULAR,
        isDataLoaded: true
      });
  });

  it(`Reducer should reset favorite offers`, () => {
    const state = {
      offers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: false}, {id: 3, isFavorite: true}],
      activeCity: Cities.PARIS,
      activeSorting: SortingTypes.POPULAR,
      isDataLoaded: true
    };

    expect(reducer(state, ActionCreator.resetFavorites()))
      .toEqual({
        offers: [{id: 1, isFavorite: false}, {id: 2, isFavorite: false}, {id: 3, isFavorite: false}],
        activeCity: Cities.PARIS,
        activeSorting: SortingTypes.POPULAR,
        isDataLoaded: true
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to fetch offers`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffers();

    apiMock
      .onGet(APIRoutes.OFFERS)
      .reply(200, offersRaw);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: offersRaw
        });
      });
  });
});

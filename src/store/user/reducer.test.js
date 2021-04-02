import {reducer} from './reducer';
import {ActionType} from '../action';
import {APIRoutes, AppRoutes, AuthorizationStatus} from '../../const';

import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {checkAuth, login, logout} from '../api-actions';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {}))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH, authInfo: {}});
  });

  it(`Reducer should update authorization status to AUTH`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH, authInfo: {}};

    const authAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(reducer(state, authAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH, authInfo: {}});
  });

  it(`Reducer should update authorization status to NO_AUTH`, () => {
    const state = {authorizationStatus: AuthorizationStatus.AUTH, authInfo: {}};

    const noAuthAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(reducer(state, noAuthAction))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH, authInfo: {}});
  });

  it(`Reducer should update authorization info`, () => {
    const state = {authorizationStatus: AuthorizationStatus.AUTH, authInfo: {}};

    const setAuthAction = {
      type: ActionType.SET_AUTH_INFO,
      payload: {
        "avatar_url": `img/1.png`,
        "email": `Oliver.conner@gmail.com`,
        "id": 1,
        "is_pro": false,
        "name": `Oliver.conner`
      },
    };

    expect(reducer(state, setAuthAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH, authInfo: {
          "avatar_url": `img/1.png`,
          "email": `Oliver.conner@gmail.com`,
          "id": 1,
          "is_pro": false,
          "name": `Oliver.conner`
        }
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct get API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoutes.LOGIN)
      .reply(200, {email: `test@gmail.com`, name: `test`});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AUTH_INFO,
          payload: {email: `test@gmail.com`, name: `test`},
        });
      });
  });

  it(`Should make a correct post API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@gmail.com`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoutes.LOGIN)
      .reply(200, {email: `test@gmail.com`, name: `test`});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AUTH_INFO,
          payload: {email: `test@gmail.com`, name: `test`},
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoutes.MAIN,
        });
      });
  });

  it(`Should make a correct get API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(APIRoutes.LOGOUT)
      .reply(200);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AUTH_INFO,
          payload: {},
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.RESET_FAVORITES
        });
      });
  });
});

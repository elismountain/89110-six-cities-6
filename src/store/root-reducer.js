import {combineReducers} from 'redux';
import {reducer as mainReducer} from './main/reducer';
import {reducer as userReducer} from './user/reducer';
import {reducer as offerReducer} from './offer/reducer';
import {reducer as favoritesReducer} from './favorites/reducer';

export const NameSpace = {
  USER: `USER`,
  MAIN: `MAIN`,
  OFFER: `OFFER`,
  FAVORITES: `FAVORITES`
};

const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.MAIN]: mainReducer,
  [NameSpace.OFFER]: offerReducer,
  [NameSpace.FAVORITES]: favoritesReducer
});

export {rootReducer};

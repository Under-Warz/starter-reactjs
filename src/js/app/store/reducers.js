// import vendors
import { combineReducers } from 'redux';

// import classes
import locationReducer from '../reducers/location';
import session from '../reducers/session';


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    location: locationReducer,
    session: session,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
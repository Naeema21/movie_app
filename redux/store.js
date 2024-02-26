import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { favouriteSlice } from './reducer';

const rootReducer = combineReducers({
  favourite: favouriteSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer
});
export default store;
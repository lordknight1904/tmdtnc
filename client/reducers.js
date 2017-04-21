/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import auth from './modules/Auth/AuthReducer';
import userProfile from './modules/UserProfile/UserProfileReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  intl,
  auth,
  userProfile,
});

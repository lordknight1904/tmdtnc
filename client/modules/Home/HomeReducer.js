import { ACTIONS } from './HomeActions';

// Initial State
const initialState = {
  auth: {
    currently: 'ANONYMOUS',
    userName: null,
    uid: null,
    avatarLink: '',
  },
};
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ATTEMPTING_LOGIN:
      return {
        currently: 'AWAITING_AUTH_RESPONSE',
        userName: 'guest',
        uid: null,
        avatarLink: '',
      };
    case ACTIONS.LOGOUT:
      return {
        auth: {
          currently: 'ANONYMOUS',
          userName: 'guest',
          uid: null,
          avatarLink: '',
        },
      };
    case ACTIONS.LOGIN_USER:
      console.log(action.user);
      return {
        auth: {
          currently: 'LOGGED_IN',
          userName: action.user.user.displayName,
          uid: action.user.credential.accessToken,
          avatarLink: action.user.user.photoURL,
        },
      };
    case ACTIONS.TEST:
      console.log('Asynced');
      return state;
    default:
      return state;
  }
};
export const getCurrently = state => state.home.auth.currently;
export const getUsername = state => state.home.auth.userName;
export const getAvatarLink = state => state.home.auth.avatarLink;
export const getUid = state => state.home.auth.uid;
// Export Reducer
export default HomeReducer;

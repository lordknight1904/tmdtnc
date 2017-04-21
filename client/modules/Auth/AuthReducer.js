import { ACTIONS } from './AuthActions';
import callApi from '../../util/apiCaller';
// Initial State
const initialState = {
  currently: 'ANONYMOUS',
  firstName: '',
  lastName: '',
  accessToken: null,
  avatarLink: '',
  _id: '',
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ATTEMPTING_LOGIN:
      return {
        currently: 'AWAITING_AUTH_RESPONSE',
        firstName: '',
        lastName:  '',
        accessToken: null,
        avatarLink: '',
        _id: '',
      };
    case ACTIONS.LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return {
        currently: 'ANONYMOUS',
        firstName: '',
        lastName:  '',
        accessToken: null,
        avatarLink: '',
        _id: '',
      };
    case ACTIONS.LOGIN_USER:
      localStorage.setItem('user', action.user._id);
      localStorage.setItem('accessToken', action.user.accessToken);
      return {
        currently: 'LOGGED_IN',
        firstName: action.user.firstName,
        lastName:  action.user.lastName,
        accessToken: action.user.accessToken,
        avatarLink: action.user.avatar,
        _id: action.user._id,
      };
    case ACTIONS.BASIC_INFO_UPDATED:
      state.firstName = action.updateInfo.firstName;
      state.lastName =  action.updateInfo.lastName;
      return {...state};
    case ACTIONS.SIGN_UP:
      return (dispatch) => {
        return callApi('signup', 'post', {user}).then(res => dispatch(loginUser(res.user)));
      };
    default:
      return state;
  }
};
export const getCurrently = state => state.auth.currently;
export const getFirstName = state => state.auth.firstName;
export const getLastName = state => state.auth.lastName;
export const getAvatarLink = state => state.auth.avatarLink;
export const getAccessToken = state => state.auth.accessToken;
export const getId = state => state.auth._id;
export const getUserInfo = state => state.auth;
// Export Reducer
export default AuthReducer;

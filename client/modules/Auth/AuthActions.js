import callApi from '../../util/apiCaller';

import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyBNZkP9SRMEFFPbjcYUAKUE9dZuHX3AvCg',
  authDomain: 'fir-forvirtualcinema.firebaseapp.com',
  databaseURL: 'https://fir-forvirtualcinema.firebaseio.com',
  storageBucket: 'fir-forvirtualcinema.appspot.com',
  messagingSenderId: '505414030032',
};
firebase.initializeApp(config);

export const ACTIONS = {
  ATTEMPTING_LOGIN: 'ATTEMPTING_LOGIN',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT: 'LOGOUT',
  SIGN_UP: 'SIGN_UP',
  BASIC_INFO_UPDATED: 'BASIC_INFO_UPDATED',
};

export function signUp(newUser){
  return () => {
    return callApi('signup', 'post', {newUser});
  };
}
export function loginUser(user){
  return {
    type: ACTIONS.LOGIN_USER,
    user
  };
}
export function basicInfoUpdated(updateInfo){
  return {
    type: ACTIONS.BASIC_INFO_UPDATED,
    updateInfo
  };
}
export function logout() {
  return {
    type: ACTIONS.LOGOUT
  };
}
export function loggingInByFacebook() {
  return (dispatch) => {
    const auth = firebase.auth();
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    return auth.signInWithPopup(provider).then((user) => {
      let userInfo = {
        firstName: user.user.displayName.substr(0,user.user.displayName.indexOf(' ')),
        lastName: user.user.displayName.substr(user.user.displayName.indexOf(' ')+1,
          user.user.displayName.length-user.user.displayName.indexOf(' ')),
        email: user.user.email,
        avatar: user.user.photoURL,
        idSocial: user.user.uid,
        accessToken: user.credential.accessToken,
      };
      return callApi('social', 'post', {userInfo}).then(res => dispatch(loginUser(res.user)));
    });
  };
}
export function loggingInByGoogle() {
  return (dispatch) => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    return auth.signInWithPopup(provider).then((user) => {
      let userInfo = {
        firstName: user.user.displayName.substr(0,user.user.displayName.indexOf(' ')),
        lastName: user.user.displayName.substr(user.user.displayName.indexOf(' ')+1,
          user.user.displayName.length-user.user.displayName.indexOf(' ')),
        email: user.user.email,
        avatar: user.user.photoURL,
        idSocial: user.user.uid,
        accessToken: user.credential.accessToken,
      };
      return callApi('social', 'post', {userInfo}).then(res => dispatch(loginUser(res)));
    });
  };
}
export function reLogin (user) {
  return (dispatch) => {
    return callApi('relogin', 'post', {user}).then(res => dispatch(loginUser(res.user)));
  };
}
export function loggingInByAccount(user) {
  return (dispatch) => {
    return callApi('login', 'post', {user}).then((res) => {
      if(typeof res.user === 'undefined' || res.user === 'Unexisted' || typeof res.login !== 'undefined'){

      }else{
        dispatch(loginUser(res));
      }
    });
  };
}

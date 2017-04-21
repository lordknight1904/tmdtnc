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
  TEST: 'TEST',
};
export function testAsync(){
  return {
    type: ACTIONS.TEST,
  };
}
export function loginUser(user){
  return {
    type: ACTIONS.LOGIN_USER,
    user
  };
}
export function logout(dispatch) {
  const auth = firebase.auth();
  auth.signOut().then(() => {
    dispatch({
      type: 'LOGOUT',
    });
  });
}
export function loggingIn(selectedProvider) {
  const auth = firebase.auth();
  switch (selectedProvider) {
    case 'facebook': {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
        display: 'popup',
      });
      return (dispatch) => {
        auth.signInWithPopup(provider).then((user) => dispatch(loginUser(user)));
      };
    }
    case 'google': {
    }
    default: {
      break;
    }
  }
}

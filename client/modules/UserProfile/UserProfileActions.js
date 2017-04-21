import callApi from '../../util/apiCaller';
export const ACTIONS = {
  FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
  UPDATE_BASIC_INFO: 'UPDATE_BASIC_INFO',
};
export function userUpdated(updatedInfo){
  return {
    type: ACTIONS.UPDATE_BASIC_INFO,
    updatedInfo
  };
}
export function fetchUserProfileRequest(userId){
  return (dispatch) => {
    return callApi(`user/${userId}`, 'get').then(res => dispatch(fetchUserProfile(res.user)));
  };
}
export function fetchUserProfile(userProfile){
  return {
    type: ACTIONS.FETCH_USER_PROFILE,
    userProfile
  }
}
export function updateBasicInfo (updateInfo) {
  return (dispatch) => {
    return callApi('/user/updatebasicinfo', 'post', {updateInfo}).then(res => dispatch(userUpdated(res.updateInfo)));
  };
}

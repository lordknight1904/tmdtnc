import { ACTIONS } from './UserProfileActions';

// Initial State
const initialState = {
  accommodation: {
    country: '',
    city: '',
    district: '',
    street: '',
    address: '',
  },
  birthday: '',
  gender: '',
  // education
  education: [],
  // expertise
  occupation: [],
  experience:[],
};
const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_USER_PROFILE:
      return {
        accommodation: action.userProfile.accommodation ? action.userProfile.accommodation : '',
        birthday: action.userProfile.birthday? action.userProfile.birthday:'',
        gender: action.userProfile.gender? action.userProfile.gender:'',
        education: action.userProfile.education ? action.userProfile.education:'',
        occupation: action.userProfile.occupation ? action.userProfile.occupation:'',
        experience: action.userProfile.experience ? action.userProfile.experience:'',
      };
    case ACTIONS.UPDATE_BASIC_INFO:
      // return {
      //   accommodation: state.accommodation,
      //   birthday: state.birthday,
      //   gender: action.updatedInfo.gender,
      //   education: state.education,
      //   occupation: state.occupation,
      //   experience: state.experience,
      // };
      state.gender = action.updatedInfo.gender;
      return {...state};
    default:
      return state;
  }
};
export const getAccommodation = state => state.userProfile.accommodation;
export const getBirthday = state => state.userProfile.birthday;
export const getGender = state => state.userProfile.gender;
export const getEducation = state => state.userProfile.education;
export const getOccupation = state => state.userProfile.occupation;
export const getExperience = state => state.userProfile.experience;
export default UserProfileReducer;

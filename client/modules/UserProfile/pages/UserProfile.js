import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfileRequest } from '../UserProfileActions';
import { getCurrently, getFirstName, getLastName, getAvatarLink, getId } from '../../Auth/AuthReducer';
import { getGender } from '../../UserProfile/UserProfileReducer';
import BasicInfo from '../components/BasicInfo/BasicInfo';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {},
    };
  };
  componentWillMount() {
    if(this.props.currently !== 'LOGGED_IN'){
      this.context.router.push('/');
    }
  };
  render() {
    return (
      <div>
        <BasicInfo _id={this.props._id} firstName={this.props.firstName} lastName={this.props.lastName} gender={this.props.gender}/>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    currently: getCurrently(state),
    firstName: getFirstName(state),
    lastName: getLastName(state),
    avatarLink: getAvatarLink(state),
    gender: getGender(state),
    _id: getId(state),
  };
}

UserProfile.propTypes = {
};

UserProfile.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserProfile);

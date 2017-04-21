import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
class Logged extends Component {
  constructor(props) {
    super(props);
  };
  handleProfileClick = () => {
    this.context.router.push('/user/' + this.props._id);
  };
  render() {
    return (
      <div>
        <Avatar src={this.props.avatar} size={50} round={true}/>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'center'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText="Profile" onTouchTap={this.handleProfileClick}/>
          <MenuItem primaryText="Sign out" onTouchTap={this.props.onSignOut}/>
        </IconMenu>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
  };
}
Logged.contextTypes = {
  router: React.PropTypes.object,
};
Logged.propTypes = {
  avatar: React.PropTypes.string,
  _id: React.PropTypes.string,
  userName: React.PropTypes.string,
  onSignOut: React.PropTypes.func,
};

export default connect(mapStateToProps)(Logged);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LoginForm from './LoginForm/LoginForm';
import Logged from './Logged/Logged';
import { getUserInfo } from '../../modules/Auth/AuthReducer';
import { logout } from '../../modules/Auth/AuthActions';
import { fetchUserProfileRequest  } from '../../modules/UserProfile/UserProfileActions';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { reLogin } from '../../modules/Auth/AuthActions';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLoginForm: false,
      sign: true,
      logged: false,
    };
  };
  componentWillMount() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user') && localStorage.getItem('accessToken')) {
      const user = {
        _id: localStorage.getItem('user'),
        accessToken: localStorage.getItem('accessToken'),
      };
      this.props.dispatch(reLogin(user)).then((res)=>{
        if(res.user.user !== "Unexisted") {
          this.setState({logged: true});
          this.props.dispatch(fetchUserProfileRequest(res.user._id));
        }
      });
    }
  }
  handleOpenLoginForm = () =>{
    this.setState({openLoginForm: true});
  };
  onCancel = () => {
    this.setState({openLoginForm: false});
  };
  onSign = () => {
    this.setState({sign: !this.state.sign});
  };
  onLogged = () => {
    this.setState({ logged: true});
  };
  onUnLog = () => {
    this.setState({ logged: false});
  };
  onSignOut = () => {
    this.props.dispatch(logout());
    this.onUnLog();
  };
  render() {
    return (
      <div style={{width:'100%'}}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Luận Án" />
          </ToolbarGroup>
          <ToolbarGroup>
            {!(this.state.logged) ?
              <FlatButton label="Login" onTouchTap={this.handleOpenLoginForm}/>:
              <Logged _id={this.props.user._id} avatar={this.props.user.avatarLink} userName={this.props.user.displayName} onSignOut={this.onSignOut}/>
            }
          </ToolbarGroup>
        </Toolbar>
        <LoginForm
          openLoginForm={this.state.openLoginForm}
          onCancel={this.onCancel}
          sign={this.state.sign}
          onSign={this.onSign}
          onLogged={this.onLogged}
        />
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  };
}

HeaderBar.propTypes = {
};

export default connect(mapStateToProps)(HeaderBar);

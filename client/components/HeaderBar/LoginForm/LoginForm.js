import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { signUp, loggingInByFacebook, loggingInByGoogle, loggingInByAccount } from '../../../modules/Auth/AuthActions';
import { fetchUserProfileRequest  } from '../../../modules/UserProfile/UserProfileActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      emailSignUpError: '',
      passwordSignUpError: '',
      firstNameSignUpError: '',
      lastNameSignUpError: '',
      openSnackbar: false,
    }
  };
  // control for Text Fields
  handleEmailTextField = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePasswordTextField = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleFirstNameTextField = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };
  handleLastNameTextField = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };
  // login type controller
  onLogin = () =>{
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(loggingInByAccount(user)).then(()=>{
      this.props.onCancel();
      this.props.onLogged();
    });
  };
  onFacebook = () =>{
    this.props.dispatch(loggingInByFacebook()).then((res)=>{
      this.props.onCancel();
      this.props.onLogged();
      this.props.dispatch(fetchUserProfileRequest(res.user._id));
    });
  };
  onGoogle = () =>{
    this.props.dispatch(loggingInByGoogle()).then((res)=>{
      this.props.onCancel();
      this.props.onLogged();
      this.props.dispatch(fetchUserProfileRequest(res.user._id));
    });
  };
  onSignUp = () =>{
    let checkField = true;
    if(this.state.email === '') { this.setState({ emailSignUpError: 'This field cannot be empty' }); checkField = false; }
    else this.setState({ emailSignUpError: '' });

    if(this.state.password === '') { this.setState({ passwordSignUpError: 'This field cannot be empty' }); checkField = false; }
    else this.setState({ passwordSignUpError: '' });

    if(this.state.firstName === '') { this.setState({ firstNameSignUpError: 'This field cannot be empty' }); checkField = false; }
    else this.setState({ firstNameSignUpError: '' });

    if(this.state.lastName === '') { this.setState({ lastNameSignUpError: 'This field cannot be empty' }); checkField = false; }
    else this.setState({ lastNameSignUpError: '' });
    if(checkField) {
      this.props.dispatch(signUp({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      })).then((res) => {
        if (typeof res.err !== 'undefined'){
          if(res.err.code == 11000) this.setState({emailSignUpError: 'Email is taken'});
        }else{
          this.onLogin();
          this.setState({openSnackbar: true});
        }
      });
    }
  };
  // Other
  handleRequestClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };
  render() {
    return (
      <div>
        {(this.props.sign)?(
          <Modal
            isOpen={this.props.openLoginForm}
            style={customStyles}
            contentLabel="Modal"
            >
            <TextField hintText="Email" value={this.state.email} onChange={this.handleEmailTextField}/>
            <br />
            <TextField hintText="Password" value={this.state.password} onChange={this.handlePasswordTextField}  type="password"/>
            <br />
            <FlatButton id="login-btn" label="With Facebook" onClick={this.onFacebook}/>
            <FlatButton id="login-btn" label="With Gmail" onClick={this.onGoogle}/>
            <br/>
            <FlatButton id="login-btn" label="Login" onClick={this.onLogin}/>
            <FlatButton id="signup-btn" label="Sign Up" onClick={this.props.onSign}/>
            <FlatButton id="cancel-btn" label="Cancel" onClick={this.props.onCancel}/>
          </Modal>
          ):(
          <Modal
            isOpen={this.props.openLoginForm}
            style={customStyles}
            contentLabel="Modal"
          >
            <TextField hintText="Email" value={this.state.email} errorText={this.state.emailSignUpError} onChange={this.handleEmailTextField}/>
            <br />
            <TextField hintText="Password" value={this.state.password} onChange={this.handlePasswordTextField} errorText={this.state.passwordSignUpError} type="password"/>
            <br />
            <TextField hintText="First Name" value={this.state.firstName} errorText={this.state.firstNameSignUpError} onChange={this.handleFirstNameTextField}/>
            <TextField hintText="Last Name" value={this.state.lastName} errorText={this.state.lastNameSignUpError} onChange={this.handleLastNameTextField}/>
            <br />
            <FlatButton id="login-btn" label="Sign Up" onClick={this.onSignUp}/>
            <FlatButton id="login-btn" label="Login" onClick={this.props.onSign}/>
            <FlatButton id="cancel-btn" label="Cancel" onClick={this.props.onCancel}/>
          </Modal>
          )
        }
        <Snackbar
          open={this.state.openSnackbar}
          message="Account successfully created"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
  };
}

LoginForm.propTypes = {
  openLoginForm: React.PropTypes.bool,
  onCancel: React.PropTypes.func,
  sign: React.PropTypes.bool,
  onSign: React.PropTypes.func,
  onLogged: React.PropTypes.func,
};

export default connect(mapStateToProps)(LoginForm);

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../Auth/AuthReducer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import TextField from 'material-ui/TextField';
import './example.css';

class Home extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        abc
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state)
  };
}

Home.propTypes = {
};

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Home);

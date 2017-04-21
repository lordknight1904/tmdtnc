import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { updateBasicInfo } from '../../UserProfileActions';
import { basicInfoUpdated } from '../../../Auth/AuthActions';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editMode: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      gender: this.props.gender,
    };
  };
  handleChangeFirstName = (event) => {
    this.setState({firstName: event.target.value});
  };
  handleChangeLastName = (event) => {
    this.setState({lastName: event.target.value});
  };
  handleChangeGender = (event) => {
    this.setState({gender: event.target.value});
  };
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
    if(!expanded) this.setState({editMode: false})
  };
  handleEdit = () =>{
    this.setState({
      editMode: true,
      expanded: true
    });
  };
  handleAbort = () =>{
    this.setState({
      editMode: false,
      expanded: false
    });
  };
  handleSave = () =>{
    const updateInfo = {
      _id: this.props._id,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      gender: this.state.gender,
    };
    console.log(updateInfo);
    this.props.dispatch(updateBasicInfo(updateInfo)).then((res)=>{
      this.props.dispatch(basicInfoUpdated(res.updatedInfo));
    });
  };
  render() {
    console.log(this.props._id);
    return (
      <div>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title="Basic Information"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            {
              (this.state.editMode)?(
                <div>
                  <FlatButton label="Save" onTouchTap={this.handleSave}/>
                  <FlatButton label="Abort" onTouchTap={this.handleAbort}/>
                </div>
                ):
                (<FlatButton label="Edit" onTouchTap={this.handleEdit}/>)

            }

          </CardActions>
          <CardText expandable={true}>
            {
              (!this.state.editMode)?(
                <div>
                  Name: {this.state.firstName + ' ' + this.state.lastName}<br/>
                  Gender: {this.state.gender}<br/>
                </div>
              ):(
                <div>
                  <TextField hintText="First Name" value={this.state.firstName} onChange={this.handleChangeFirstName}/> <br/>
                  <TextField hintText="Last Name" value={this.state.lastName} onChange={this.handleChangeLastName}/> <br/>
                  <TextField hintText="Gender" value={this.state.gender} onChange={this.handleChangeGender}/> <br/>
                </div>
              )
            }
          </CardText>
        </Card>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
  };
}

BasicInfo.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  gender: React.PropTypes.string,
  _id: React.PropTypes.string,
};

BasicInfo.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(BasicInfo);

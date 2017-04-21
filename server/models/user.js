import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // auth info
  idSocial: {type: 'String'},
  accessToken: {type: 'String'},
  email: {type: 'String', unique: true},
  password: {type: 'String'},
  avatar: {type: 'String'},
  gender: {type: 'String'},

  firstName: {type: 'String'},
  lastName: {type: 'String'},
  // basic info
  telephone: {type: 'String'},
  accommodation: {
    country: {type: 'String'},
    city: {type: 'String'},
    district: {type: 'String'},
    street: {type: 'String'},
    address: {type: 'String'},
  },
  birthday: {type: 'Date'},
  // education
  education: [{
    degree: 'String',
    major: 'String',
    from: 'Date',
    to: 'Date',
  }],
  // expertise
  occupation: [{
    occupation: 'String',
    workplace: 'String',
    from: 'Date',
    to: 'Date',
  }],
  experience:[{
    type: 'String',
  }]
});

export default mongoose.model('User', userSchema);

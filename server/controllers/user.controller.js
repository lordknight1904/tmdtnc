import User from '../models/user.js';
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';

export function addUser(req, res) {
  if (!req.body.newUser.firstName || !req.body.newUser.lastName || !req.body.newUser.email) {
    res.status(403).end();
  }else {
    const user = new User(req.body.newUser);
    user.firstName = sanitizeHtml(user.firstName);
    user.lastName = sanitizeHtml(user.lastName);
    user.email = sanitizeHtml(user.email);
    user.avatar = '';
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send(err);
      } else {
        user.password = hash;
        user.save((err, saved) => {
          if (err) {
            res.json({err: err});
          } else {
            res.json({user: saved});
          }
        });
      }
    });
  }
}
export function socialLogin(req, res) {
  User.findOne({email: req.body.userInfo.email}).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }else{
      if(user === null){
        const newUser = new User(req.body.userInfo);
        newUser.set('accessToken',req.body.userInfo.accessToken);
        newUser.save((err, user) => {
          if (err) {
            res.status(500).send(err);
          }else{
            newUser.accessToken = req.body.userInfo.accessToken;
            res.json({user});
          }
        });
      }else{
        User.update({email: req.body.userInfo.email}, {
          accessToken: req.body.userInfo.accessToken
        }, function(err2) {
          if (err2) {
            res.status(500).send(err);
          }else{
            user.accessToken = req.body.userInfo.accessToken;
            user.set('accessToken',req.body.userInfo.accessToken);
            res.json({user})
          }
        });
      }
    }
  });
}
export function accountLogin(req, res) {
  User.findOne({email: req.body.user.email}).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }else {
      if (user !== null) {
        bcrypt.compare(req.body.user.password, user.password, function (err, result) {
          if (err) res.json({err: err});
          else {
            if(result){
              res.json({user})
            }else{
              res.json({login: 'Wrong Password'})
            }
          }
        });
      }else{
        res.json({user: 'Unexisted'})
      }
    }
  });
}
export function reLogin(req, res) {
  if(req.body.user._id !== 'undefined' || req.body.user.accessToken !== 'undefined'){
    User.findOne({
      _id: req.body.user._id,
      accessToken: req.body.user.accessToken
    }).exec((err, user) =>{
      if (err) {
        res.status(500).send(err);
      }else {
        res.json({user})
      }
    });
  }else{
    res.json({user: 'Unexisted'})
  }
}
export function getUser(req, res) {
  User.findOne({_id: req.params.userId}).exec((err, user) => {
    if(err) {
      res.status(500).send(err);
    } else{
      res.json({user});
    }
  });
}
// update functions
export function updateBasicInfo(req, res) {
  console.log(req.body.updateInfo);
  User.update({_id: req.body.updateInfo._id}, {
    firstName: req.body.updateInfo.firstName,
    lastName: req.body.updateInfo.lastName,
    gender: req.body.updateInfo.gender,
  }, function(err, tank) {
    if(err) {
      res.status(500).send(err);
    }else{
      if(tank.nModified !=0) res.json({updateInfo: req.body.updateInfo});
      else res.json({updateInfo: 'Unexisted'});
    }
  })
}

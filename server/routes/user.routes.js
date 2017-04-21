import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Signup
router.route('/signup').post(UserController.addUser);
// Social Login
router.route('/social').post(UserController.socialLogin);
// re-Login
router.route('/relogin').post(UserController.reLogin);
// Account Login
router.route('/login').post(UserController.accountLogin);
// User Info
router.route('/user/:userId').get(UserController.getUser);
// update routes
router.route('/user/updatebasicinfo').post(UserController.updateBasicInfo);

export default router;

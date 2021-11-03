const express = require('express');
const router = express.Router();

const { SignIn,SignUp } = require('../controllers/user');
const { AddStation,GetStations } = require('../controllers/user');
const { ForgotPassword,ResetPassword } = require('../controllers/user');
const { isAuth,isForgotAuth } = require('../utils/isAuth');

router.post('/signup', SignUp);
router.post('/signin', SignIn);

router.post('/forgotPassword', ForgotPassword);
router.post('/resetPassword', isForgotAuth , ResetPassword);

router.get('/getStations', isAuth , GetStations);
router.post('/addStation', isAuth , AddStation);

// router.post('uploadPhoto', upload.single('file'), isAuth , UploadPhoto);

module.exports = router
const express = require('express');
const router = express.Router();

const { SignIn,SignUp } = require('../controllers/user');
const { AddStation,GetStations } = require('../controllers/user');
const { isAuth } = require('../utils/isAuth');

router.post('/signup', SignUp);
router.post('/signin', SignIn);

router.get('/getStations', isAuth , GetStations);
router.post('/addStation', isAuth , AddStation);

module.exports = router
const express = require('express');
const router = express.Router();
const Controller = require('../controller/user');
const authUtils = require('../middlewares/authUtils')
router.post('/signup', Controller.signup);
router.post('/signin', Controller.signin);
router.get('/profile', authUtils.checkToken, Controller.getProfile);
router.get('/:id', authUtils.checkToken, Controller.readOne);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
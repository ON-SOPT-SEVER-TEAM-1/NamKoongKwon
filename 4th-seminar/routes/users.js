const express = require('express');
const router = express.Router();
const Controller = require('../controller/user');

router.post('/signup', Controller.signup);
router.post('/signin', Controller.signin);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
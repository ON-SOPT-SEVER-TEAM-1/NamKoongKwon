const express = require('express');
const router = express.Router();
const Controller = require('../controller/post');

router.post('/', Controller.createPost);
router.get('/', Controller.readAllPost);
router.post('/:postId/like', Controller.createLike);
module.exports = router;
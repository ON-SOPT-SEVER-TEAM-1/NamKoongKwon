const express = require('express');
const router = express.Router();
const Controller = require('../controller/post');
const upload = require('../modules/multer');

router.post('/', upload.single('image'), Controller.createPost);
router.get('/', Controller.readAllPost);
router.post('/:postId/like', Controller.createLike);
router.delete('/:postId/like', Controller.deleteLike);

module.exports = router;
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User, Post, Like } = require('../models');

module.exports = {
  createPost: async (req, res) => {
    const { title, contents, userId } = req.body;
    try {
      const user = await User.findOne({
        where: {
          id: userId
        }
      });
      const post = await Post.create({
        title,
        contents,
        postImageUrl: "postImageUrl"
      });
      await user.addPost(post);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, post));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL));
    }
  },
  readAllPost: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{
          model: User,
          attributes: ['email', 'userName'],
        }, {
          model: User,
          as: 'Liker',
          attributes: { exclude: ['password', 'salt'] }
        }]
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, "전체 게시물 조회 성공", posts));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, "전체 게시물 조회 실패"));
    }
  },
  createLike: async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.body.userId;
    try {
      const like = await Like.create({
        UserId,
        PostId
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_LIKE_SUCCESS, like));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_LIKE_FAIL));
    }
  },
};
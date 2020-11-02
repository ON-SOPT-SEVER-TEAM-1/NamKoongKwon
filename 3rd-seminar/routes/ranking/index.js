var express = require('express');
var router = express.Router();

router.get('/popular', function (req, res, next) {
  res.status(200).send("인기많은순 뉴스");
});
router.get('/bestreply', function (req, res, next) {
  res.status(200).send("댓글많은순 뉴스");
});
router.get('/age', function (req, res, next) {
  res.status(200).send("나이별 랭킹뉴스");
});
module.exports = router;

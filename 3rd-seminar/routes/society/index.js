var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).send("사회 뉴스");
});

module.exports = router;

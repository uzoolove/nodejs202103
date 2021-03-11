var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 목록 조회
router.get('/board', function(req, res, next) {
  res.render('board/list', { title: '게시물 목록' });
});

module.exports = router;

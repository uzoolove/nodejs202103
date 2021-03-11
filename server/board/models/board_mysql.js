var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
	user: 'node',
	password: 'node',
	database: 'board'
});

var sql = {
		list: 'SELECT _id, title, writer, view, regdate FROM board ORDER BY _id DESC',
		show: 'SELECT * FROM board WHERE _id=?',
		incView: 'UPDATE board SET view=view+1 WHERE _id=?',
		create: 'INSERT INTO board SET ?',
		remove: 'DELETE FROM board WHERE _id=?'
};

module.exports = {
	// 게시물 목록 조회
	list: function(cb){
		
	},
	// 게시물 상세 조회
	show: function(no, cb){
		
	},
	// 게시물 등록
	create: function(article, cb){
		article.regdate = require('date-format').asString('yyyy-MM-dd hh:mm:ss', new Date());
		
	},
	// 게시물 삭제
	remove: function(no, cb){
		
	}
};















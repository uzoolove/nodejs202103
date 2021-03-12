var assert = require('assert');
var upper = require('./upper');
var model = require('../models/board');

var article = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};

// test suite
describe('# upper 함수 테스트', function(){
  describe('# 동기 테스트', function(){
    // unit test
    it('sync(hello, 2)', function(){
      assert(upper.sync('hello', 2) === 'L');
    });
    it('sync(hello, 5)', function(){
      assert.strictEqual(upper.sync('hello', 5), null);
    });
    it('sync(hello, 0)', function(){
      assert.strictEqual(upper.sync('hello', 0), 'H');
    });
  });
  describe('# 비동기 테스트', function(){
    this.timeout(5000);
    // unit test
    it('async(hello, 2)', function(done){
      this.timeout(1000);
      upper.async('hello', 2, function(result){
        assert(result === 'L');
        done();
      });
    });
    it('async(hello, 5)', function(done){
      upper.async('hello', 5, function(result){
        assert(result === null);
        done();
      });
    });
    it('async(hello, 0)', function(done){
      upper.async('hello', 0, function(result){
        assert(result === 'H');
        done();
      });
    });
  });
});

var newNo;
describe.only('# 게시판 테스트', function(){
  // 사전 작업 정의
  before(function(done){
    setTimeout(done, 1000);
  });

  var oldList;
  before(function(done){
    model.list(function(result){
      oldList = result;
      done();
    });
  });

  // 사후 작업 처리
  after(function(){
    model.dbClose();
  });

  describe('등록', function(){
    it('등록 요청', function(done){
      model.create(article, function(no){
        assert.strictEqual(typeof no, 'number');
        newNo = no;
        done();
      });
    });
    it('등록한 게시물 조회', function(done){
      model.show(newNo, function(newArticle){
        assert.deepStrictEqual(newArticle, article);
        done();
      });
    });
  });
  describe('삭제', function(){
    it('삭제 요청', function(done){
      model.remove(newNo, done);
    });
    it('목록 조회', function(done){
      model.list(function(result){
        assert.deepStrictEqual(result, oldList);
        done();
      });
    });
  });
});


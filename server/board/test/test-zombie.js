var article = {writer: '좀비', title: '좀비가 등록함.', content: '좀비가 등록한 게시물'};

var Browser = require('zombie');
Browser.localhost('localhost', 80);

describe('게시판 테스트', function(){
  describe('메인 페이지 접속', function(){
    var browser = new Browser();
    before(function(done){
      browser.visit('/', done);
    });

    it('접속 성공', function(){
      // 응답 성공시 받는 응답상태코드 2xx, 3xx 여부 확인
      browser.assert.success();
    });
    it('목록 화면', function(){
      browser.assert.text('header h1', '게시물 목록');
    });
  });

  describe('게시물 등록', function(){
    var browser = new Browser();
    before(function(done){
      browser.visit('/board/new', done);
    });

    it('접속 성공', function(){
      // 응답 성공시 받는 응답상태코드 2xx, 3xx 여부 확인
      browser.assert.success();
    });
    it('등록 화면', function(){
      browser.assert.text('header h1', '글쓰기');
    });
    it('등록 요청', function(done){
      browser.fill('writer', article.writer);
      browser.fill('title', article.title);
      browser.fill('content', article.content);
      browser.pressButton('#regist', done);
    });
    it('등록 결과 화면', function(){
      browser.assert.success();
      browser.assert.text('header h1', '등록 결과');
    });
  });
});
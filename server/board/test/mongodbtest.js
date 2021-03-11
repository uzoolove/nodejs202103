// 등록할 게시물
var b1 = {
  _id: 1,
  title: 'Express 소개',
  writer: 'Express',
  content: `Express는 웹 및 모바일 애플리케이션을 위한 강력한 기능 세트를 제공하는 경량의 유연한 Node.js 웹 애플리케이션 프레임워크입니다.
            수많은 HTTP 유틸리티 메소드와 미들웨어를 사용하여 강력한 API를 빠르고 쉽게 작성할 수 있습니다.
            Express는 사용자가 알고 사랑하는 Node.js 기능을 방해하지 않으면서 기본 웹 애플리케이션 기능의 얇은 계층을 제공합니다.
            많은 인기있는 프레임워크가 Express를 기반으로 합니다.`,
  view: 254,
  regdate: '2099-06-20 12:34:25'
};
var b2 = {
  _id: 2,
  title: 'Express로 게시판 프로젝트 생성하기',
  writer: 'Express',
  content: `이번 시간에는 Express 프로젝트를 시작하는 방법을 알아보겠습니다.\n
            1. express-generator 확장모듈을 글로벌로 설치
                  npm i -g express-generator
            2. ejs view engine 기반의 프로젝트 생성
                  express board --view=ejs
            3. board 폴더 이동
                  cd board
            4. 의존모듈 설치
                  npm i
            5. 서버 구동
                  npm start
            6. 브라우저에서 테스트
                  localhost:3000`,
  view: 189,
  regdate: '2099-06-21 12:54:32'
};

// 현재 DB 삭제
db.dropDatabase();

// 게시물 등록(collection.insert(document))
// db.board.insertOne(b1);
// db.board.insertOne(b2);
db.board.insertMany([b1, b2]);


// 게시물 목록 조회
// collection.find({검색조건}, {출력속성})).sort({정렬옵션}).limit(개수)
db.board.find().pretty();
db.board.find({_id: 2}, {_id: 1, writer: 1, title: 1});
db.board.find({_id: 2}, {content: 0});
db.board.find({}, {content: 0}).sort({_id: -1}).limit(1);  // -1: 내림차순, 1: 오름차순

// 모든 게시물을 _id의 내림차순으로 조회
// (출력 컬럼은 번호, 제목, 글쓴이, 조회수, 작성일)
db.board.find({}, {content: 0}).sort({_id: -1});

// 게시물 한건 조회(collection.findOne({검색조건}, {출력속성}))
db.board.findOne({_id: 2});

// 게시물 수정(collection.update({검색조건}, {수정할문서}))
db.board.update({_id: 2}, {view: 190});
db.board.updateOne({_id: 1}, {$set: {view: 255}});
db.board.updateOne({_id: 1}, {$inc: {view: 1}});

// 게시물 한건 조회 및 업데이트(collection.findOneAndUpdate({검색조건}, {수정할문서}))
db.board.findOneAndUpdate({_id: 1}, {$inc: {view: 1}});

// 게시물 삭제(collection.deleteOne({검색조건}))
db.board.deleteOne({_id: 1});



// sequence용 데이터 추가
db.seq.insertOne({index: 1});

// sequence 조회 및 업데이트
db.seq.findOneAndUpdate({}, {$inc: {index: 1}});

// board DB 초기화
use boardDB;
db.dropDatabase();
db.board.insert([b1, b2]);
db.seq.insert({index: 3});
db.board.find();







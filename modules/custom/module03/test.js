var m1 = require('./m1'); // return object
console.log(typeof m1, m1.name, m1.type);
var m2 = require('./m2'); // return function
console.log(typeof m2, m2());
var m3 = require('./m3'); // return function
var kim = m3({kor: 100, eng: 90});
console.log(kim.sum(), kim.avg());
var lee = m3({kor: 90, eng: 80});
console.log(lee.sum(), lee.avg());

var http = require('./m4');
http.createServer(function(req, res){
  // req로부터 요청정보를 분석
  // res로 응답
});

var fs = require('./m4');
fs.readFile('hello.html', function(err, data){
  if(err){
    console.error(err);
  }else{
    console.log(data);
  }
});

var path = require('./m4');
var filepath = path.join(__dirname, 'public', 'hello.html');
console.log(filepath);

// var logger = require('./m5')({target: 'file', filename: 'output.txt'});
// var logger = require('./m5')({target: 'file'});
var logger = require('./m5')();
logger.log('작업 시작.');
logger.log('작업 처리중...');
logger.debug('작업 완료.');
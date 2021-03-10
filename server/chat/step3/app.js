var path = require('path');

const static = require('./middleware/static')(path.join(__dirname, 'public'));
const logger = require('./middleware/logger')({target: 'file', filename: 'chat.log'});

function app(req, res){
  // 콜백 패턴: 비동기 함수의 실행 순서를 지정하기 위해서
  static(req, res, function(){
    logger(req, res);
  });
}

module.exports = app;
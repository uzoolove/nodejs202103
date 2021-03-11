var url = require('url');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var views = path.join(__dirname, '..', 'views');

// 채팅화면으로 이동
function chat(req, res, next){
  // TODO: session의 nickname 정보를 추출
  var nickname = req.session.nickname;
  res.render('chat', {title: '채팅방', username: nickname});

  // var filename = path.join(views, 'chat.ejs');
  // ejs.renderFile(filename, {title: '채팅방', username: nickname}, function(err, data){
  //   if(err){
  //     next(err);
  //   }else{
  //     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  //     res.end(data);
  //   }
  // });


  // if(nickname){
  //   fs.readFile(filename, function(err, data){
  //     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  //     data = data.toString().replace('<%=username%>', nickname);
  //     res.end(data);
  //   });
  // }else{
  //   res.writeHead(303, {Location: '/'});
  //   res.end();
  // }
  
}
// 로그인
function login(req, res, next){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: session에 nickname 정보를 저장
    req.session.nickname = nickname;
    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}
// 로그아웃
function logout(req, res, next){
  // TODO: session 삭제
  req.session.destroy();
  res.writeHead(303, {Location: '/'});
  res.end();
}
function router(req, res, next){
  var pathname = url.parse(req.url).pathname;
  switch(pathname){
    case '/chat':
      chat(req, res, next);
      break;
    case '/login':
      login(req, res, next);
      break;
    case '/logout':
      logout(req, res, next);
      break;
    default:
      next();
  }
}

module.exports = router;
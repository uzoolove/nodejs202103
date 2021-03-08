var static = require('node-static');
var path = require('path');
// var file = new static.Server('./');
var file = new static.Server(path.join(__dirname));
require('http').createServer(function(req, res){
  file.serve(req, res);
}).listen(2345);
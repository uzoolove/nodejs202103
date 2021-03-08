var static = require('node-static');
var file = new static.Server('./');
require('http').createServer(function(req, res){
  file.serve(req, res);
}).listen(2345);
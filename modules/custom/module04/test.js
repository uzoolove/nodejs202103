var m1 = require('./m1');
var kim = new m1.Score(100, 90);
var lee = new m1.Score(90, 80);
console.log(kim.sum(), kim.avg());
console.log(lee.sum(), lee.avg());
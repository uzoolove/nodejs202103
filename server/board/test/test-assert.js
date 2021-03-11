var assert = require('assert');
var upper = require('./upper');

var success = 0;
var fail = 0;
console.log('테스트 시작.');

var result = upper.sync('hello', 2);
if(result == 'L'){
  console.log('1. 통과');
  success++;
}else{
  console.log('1. 실패');
  fail++;
}

console.log('테스트 종료.');
console.log('success', success);
console.log('fail', fail);
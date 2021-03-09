// var logger = require('./logger');
console.log('m3 로딩 시작.');
console.debug(__dirname);
console.debug(__filename);
// console.info('cache', require.cache);
require('./m1');
require('./m1');
require('./m1');

console.log('main', require.main == module, require.main.filename);
console.log('children', module.children[0] && module.children[0].filename);
console.info('m3 로딩 종료.');
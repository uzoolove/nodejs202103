var logger = require('./logger');
logger.log('m3 로딩 시작.');
logger.debug(__dirname);
logger.debug(__filename);
require('./m1');
logger.info('m3 로딩 종료.');
// 주어진 인덱스에 위치한 문자를 대문자로 반환한다.
// 인덱스를 벗어날 경우 null 반환
function getUpperCaseSync(word, index){
  var char = word.charAt(index);
  var upperChar = char.toUpperCase();
  return upperChar;
}

// 주어진 인덱스에 위치한 문자를 콜백함수를 통해 대문자로 반환한다.
// 인덱스를 벗어날 경우 null 반환
function getUpperCase(word, index, callback){
  setTimeout(() => {
    var char = word.charAt(index);
    var upperChar = char.toUpperCase();
    callback(upperChar);
  }, Math.random()*1000);
}

module.exports = {
  sync: getUpperCaseSync,
  async: getUpperCase
};
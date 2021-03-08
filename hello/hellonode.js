function hello(name){
  return ('Hello ' + name);
}
console.log(hello('Node'));

// require()의 리턴값으로 지정
module.exports = {
  hi: hello
};

// return module.exports;
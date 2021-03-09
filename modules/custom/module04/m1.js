console.log('class를 exports 하는 모듈.');
module.exports = {
  Score: class{
    constructor(kor, eng){
      this.kor = kor;
      this.eng = eng;
    }
    sum(){
      return this.kor + this.eng;
    }
    avg(){
      return this.sum() / 2;
    }
  }
};
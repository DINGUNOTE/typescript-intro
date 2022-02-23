interface User {
  age: number;
  name: string;
}

// 변수에 인터페이스 활용
var seho: User = {
  age: 30,
  name: '세호',
}

// 함수에 인터페이스 활용
function getUser(user: User) {
  console.log(user);
}
const capt = {
  name: '캡틴',
  age: 100,
}
getUser(capt);

// 함수의 구조(스펙)에 인터페이스를 활용
interface SumFunction {
  (a: number, b: number): number;
}

var sum: SumFunction;
sum = function(a: number, b: number): number {
  return a + b;
}

// 인덱싱
interface StringArray {
  [index: number]: string;
}

var arr: StringArray = ['a', 'b', 'c'];
// arr[0] = 10; // error

// 딕셔너리 패턴 - 객체 접근 방식
interface StringRegexDictionary {
  [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
  cssFile: /\.css$/,
  jsFile: /\.js$/,
}
// obj['cssFile'] = 'a'; // error

Object.keys(obj).forEach(function(value){

});

// 인터페이스 상속(확장) - 중복된 값을 갖고 있는 인터페이스가 있다면 상속(확장)을 받아서 사용할 수 있다.
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

var captain: Developer = {
  language: 'ts',
  age: 100,
  name: '캡틴',
}
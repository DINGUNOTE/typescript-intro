// 타입 추론 기본 1
var a = 'abc';

function getB(b = 10) { // 파라미터를 넘기지 않았을 때 10이라는 값을 기본적으로 준다.
  var c = 'hi';
  return b + c;
}

// 타입 추론 기본 2
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }
// var shoppingItem: Dropdown<string> = {
//   value: 'abc',
//   title: 'hello',
// }

// 타입 추론 기본 3
interface Dropdown<T> {
  value: T;
  title: string;
}
interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

var detailedItem: DetailedDropdown<number> = {
  title: 'abc',
  description: 'ab',
  value: 1,
  tag: 2,
}

// Best Common Type
var arr = [1, 2, true, 'a'];
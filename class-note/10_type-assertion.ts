// 타입 단언(type assertion)
let a;
a =  20;
a = 'a';
let b = a as string; // a를 문자열로 간주해라.

// DOM API 조작
const div = document.querySelector('div');
if (div) {
  div.innerText
}
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function introduce(): Developer | Person { // 유니온 타입을 사용하게 되면 공통된 속성만 접근할 수 있다.
  return { name: 'Tony', age: 33, skill: 'Iron Making' };
}
let tony = introduce();
console.log(tony.name); // 'Tony'
// console.log(tony.skill); // error

// 타입 단언을 통한 접근 방식
if ((tony as Developer).skill) {
  let skill = (tony as Developer).skill;
  console.log(skill);
} else if ((tony as Person).age) {
  let age = (tony as Person).age;
  console.log(age);
}

// 타입 가드 사용
function isDeveloper(target: Developer | Person): target is Developer { // target이 Developer인지
  return (target as Developer).skill !== undefined; // 스킬이 존재한다면 Developer이다.
}

if (isDeveloper(tony)) {
  console.log(tony.skill); // Developer
}else {
  console.log(tony.age); // Person
}
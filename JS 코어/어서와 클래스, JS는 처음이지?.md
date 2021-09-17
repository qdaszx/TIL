# 어서와 클래스, JS는 처음이지?

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this);
    console.log(this.name);
  }
}

var me = new User("jaehyun");
me.sayName();

//constructor 메서드는 우리가 앞에서 예기해본 Object.prototype.contructor 와는 다릅니다. 클래스의 생성자 함수라고 할 수 있습니다.
```

## 그렇다면 이 코드를 클래스를 사용하지 않고 만들어 본다면 어떨까요??

이전까지 알아왔던 방식으로 말이죠!

```javascript
function UserOld(name) {
  this.name = name;
}

UserOld.prototype.sayName = function () {
  console.log(this);
  console.log(this.name);
};

var user = new UserOld("jaehyun");
user.sayName();
```

## 맞습니다. 클래스는 정확히 생성자를 이용한 타입 생성과 그 결과가 일치합니다.

자바스크립트만의 사용자 정의 타입 생성 방법을 다른 언어의 클래스 문법처럼 바꿔준 것이 바로 자바스크립트 클래스입니다.

class로 만든 객체를 콘솔에서 확인해볼까요?

## 이처럼 내부적인 동작은 동일하지만 더 보기 좋고 편리하게 개선된 문법을 슈가 신텍스(Syntactic sugar)라고 부릅니다.

## 그렇다면 타입 상속처럼 클래스도 상속이 가능하겠죠?

```javascript
class Sausage {
  constructor(el1, el2) {
    this.inside1 = el1;
    this.inside2 = el2;
  }

  taste() {
    return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
  }
}

var classicSausage = new Sausage("닭고기", "양파");
console.log(classicSausage.taste());

class FireSausage extends Sausage {} // extends 확장 >> 상속한다.

var classicFireSausage = new FireSausage("소고기", "파");

console.log(classicFireSausage.inside1);
console.log(classicFireSausage.inside2);
console.log(classicFireSausage.taste());
```

## 이처럼 extends 연산자를 이용해 상위 타입의 프로퍼티를 상속 받는 것이 가능합니다.

call과 Object.create()함수를 사용했던 예전 코드와 비교해보세요

자 그럼 이제 불맛을 내기 위해 FireSausage만의 프로퍼티와 메소드를 추가해보겠습니다!

```javascript
class FireSausage extends Sausage {
  constructor(el1, el2, el3) {
    this.inside3 = el3;
  }

  flavor() {
    return this.inside3 + "의 풍미도 있다!";
  }
}

var classicFireSausage = new FireSausage("소고기", "파", "불맛");

console.log(classicFireSausage.taste());
console.log(classicFireSausage.flavor());

// super constructor error
```

## 자식 클래스에 constructor 함수를 선언하면 부모클래스의 constructor 함수를 덮어 씁니다.

이를 해결하기 위해 super 메소드가 필요합니다!

super 메소드는 슈퍼타입의 생성자를 호출합니다.

```javascript
class FireSausage extends Sausage {
  constructor(el1, el2, el3) {
    super(el1, el2); // super 메소드로 슈퍼타입의 생성자를 호출
    this.inside3 = el3;
  }

  flavor() {
    return this.inside3 + "의 풍미도 있다!";
  }
}

var classicFireSausage = new FireSausage("소고기", "파", "불맛");

console.log(classicFireSausage.taste());
console.log(classicFireSausage.flavor());
```

# 정리해 봅시다.

- 자바스크립트의 타입 생성 방법을 다른 언어와 비슷하도록 보기 쉽게 개선한 것이 바로 자바스크립트 클래스입니다.
- extends 연산자를 통해 상위 타입의 프로퍼티를 상속받습니다.
- super 메소드를 통해 자식클래스의 생성자 함수가 부모 클래스의 생성자 함수를 덮어 씌우는 것을 방지 할 수 있습니다.

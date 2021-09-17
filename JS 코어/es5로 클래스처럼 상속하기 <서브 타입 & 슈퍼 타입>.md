# es5로 클래스처럼 상속하기 <서브 타입 & 슈퍼 타입>

## 이제 프로토타입 공정 도입으로 더 효율적으로 객체를 생산하게 되었습니다!

- 여러분이 생산하는 객체는 바로 마늘 소시지!
- 자 그런데 이제 똑같은 소시지만 생산하다보니 예전보다 덜 팔리게 되었습니다 ㅠㅠ
- 불맛나는 소시지를 만들고 싶은데 어떻게 하면 될까요?

```javascript
// 기본 소시지 레시피
function Sausage(el1, el2) {
  this.inside1 = el1;
  this.inside2 = el2;
}

Sausage.prototype.taste = function () {
  return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
};

var mySausage = new Sausage("돼지고기", "마늘");
console.log(mySausage.taste());
```

```javascript
// 불맛 소시지 레시피
function FireSausage(el1, el2, el3) {
  this.inside1 = el1;
  this.inside2 = el2;
  this.inside3 = el3;
}

FireSausage.prototype.taste = function () {
  return this.inside1 + "와 " + this.inside2 + " 맛이 난다!";
};

FireSausage.prototype.flavor = function () {
  return this.inside3 + "의 풍미도 있다!";
};

var myNewSausage = new FireSausage("돼지고기", "마늘", "불맛");

console.log(myNewSausage.taste());
console.log(myNewSausage.flavor());
```

## 새롭게 FireSausage 라는 타입을 만들었습니다!

- 결과는 역시 성공적!
- 불맛의 풍미가 있는 소시지가 완성되어서 불티나게 팔리고 있습니다!
- 하지만 공장장은 뭔가 만족스럽지 않습니다. 소시지와 불맛 소시지의 제작공정이 너무 겹치고 있기 때문이죠!
- 이를 좀 더 효율적으로 관리할 방법은 없을까요??

## 1. 생성자 훔치기

- Sausage 타입의 프로퍼티를 가져다 써봅시다!

```javascript
function FireSausage(el1, el2, el3) {
  Sausage.call(this, el1, el2);
  this.inside3 = el3;
}

var myNewSausage = new FireSausage("돼지고기", "마늘", "불맛");
console.log(myNewSausage.inside1);
console.log(myNewSausage.inside2);
console.log(myNewSausage.inside3);
```

## 생성자는 함수이기 때문에 call() 메소드를 사용할 수 있습니다.

```javascript
function FireSausage(el1, el2, el3) {
  Sausage.call(this, el1, el2);
  this.inside3 = el3;
}
```

> FireSausage 생성자 함수의 this는 FireSausage의 인스턴스이지요? 그렇기 때문에 Sausage.call 의 this는 바로 FireSausage의 인스턴스를 가르키게 됩니다!

> 이렇게 call 이나 apply를 이용하여 인스턴스를 인수로 전달하고 프로퍼티를 상속받는 방법을 **생성자 훔치기 (constructor stealing)** 이라고 표현합니다.

## 이렇게 프로퍼티를 상속 받는 타입을 하위 타윕 (subtype)

## 상속을 해주는 타입을 상위 타입 (supertype) 이라고 합니다.

## 2. 프로토타입 상속

- Sausage 타입의 프로토타입도 가져다 써봅시다!

```javascript
FireSausage.prototype = Object.create(Sausage.prototype);
FireSausage.prototype.constructor = FireSausage;

FireSausage.prototype.flavor = function () {
  return this.inside3 + "의 풍미도 있다!";
};
```

## Object.creat() 메소드는 [[Prototype]]이 참조할 생성자의 prototype 프로퍼티를 설정합니다.

- 이제 프로토타입 체인을 통해 상위 타입의 메소드도 사용할 수 있게 되었습니다!
- 이때 인스턴스의 constructor를 FireSausage로 설정해야 한다는 것에 주의하세요.

## 비록 지금은 코드의 양이 별로 차이가 없어보이지만...

- 상속받고자 하는 상위 타입의 프로퍼티와 메소드가 많으면 많을 수록 상속은 매우 유용합니다!

## 정리해 봅시다.

- call 이나 apply를 이용하여 인스턴스를 인수로 전달하고 프로퍼티를 상속받는 방법을 생성자 훔치기라고 합니다.
- Object.create() 메소드를 통해 인스턴스의 [[Prototype]] 대상을 지정 할 수 있습니다.
- 자바스크립트에서는 상속받는 타입을 하위 타입(subtype), 상속하는 타입을 상위 타입(supertype)이라고 부릅니다.

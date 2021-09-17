# 저격수의 소양, Scope

## 유효 범위 (scope)

- 변수의 접근성과 생존 기간을 제어합니다.
- 스코프는 이름이 충돌하는 문제를 덜어주고, 자동으로 메모리를 관리합니다.

## 자바스크립트의 유효범위

1. 전역 스코프
2. 함수 스코프
3. 블록 스코프 (es6)

### 전역 스코프

- 스크립트의 어디서든 접근이 가능하기 때문에 사용이 쉽습니다.
- 타인과 협업, 라이브러리 사용시 충돌의 가능성이 있습니다.

### 함수 스코프

- 함수 내부에서 정의된 변수와 매개변수는 함수 외부에서 접근 할 수 없습니다.
- 함수 내부에서 정의된 변수라면 함수의 어느 부분에서도 접근 할 수 있습니다.

```javascript
var func = function () {
  var a = 1;
  var b = 2;

  var func2 = function () {
    var b = 5;
    var c = 6;
    a = a + b + c;

    console.log(a);
  };
  func2();
};

func();
```

```javascript
function test() {
  val = "hello";
  var val2 = "world";
}
test();

console.log(val); // "hello"
console.log(val2); // error
//선언되지 않은 전역변수에 주의
```

### 블록 스코프

- 중괄호 안에서만 접근 가능합니다
- 블록 내부에 정의된 변수는 블록의 실행이 끝나면 해제됩니다.

```javascript
if (true) {
  var value = "hello";
}
console.log(value); // "hello"

if (true) {
  let value = "world";
}
console.log(value); // "hello"
```

## 정리해 봅시다.

- 스코프는 변수의 접근성과 생존 기간을 제어합니다.
- 스코프는 이름이 충돌하는 문제를 덜어주고, 자동으로 메모리를 관리합니다.
- 자바스크립트에는 전역 스코프, 함수 스코프, 블록 스코프가 존재합니다.

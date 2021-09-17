# 좀 더 this 하기

## this 알고 계시죠?

- 함수를 호출하는 객체를 의미합니다.

### 살짝 환기해 볼가요?

- this가 존재하는 이유

```javascript
var myDiner = {
  name: "김치찌개",
  menu: function () {
    console.log("오늘 저녁은 " + myDiner.name);
  },
};

myDiner.menu();
```

위와 같은 객체가 있을 때 menu 함수는 myDiner 변수 이름이 수정될 경우나, menu 함수 자체를 다른 객체에서 사용하고 싶은 경우 사용이 불편합니다.

**참 편리하죠!**

- 이제 this를 이용하면 함수를 다른 객체에서도 재사용 할 수 있습니다.

## 이제 this를 제어해봅시다.

- 일반적으로 this의 값은 자동으로 할당되지만, 상황에 따라 제어할 수 있어야 합니다.

### call()

- call 메서드는 this의 값을 바꿀 수도 있고, 함수를 실행할 때 사용할 인수도 전달할 수 있습니다.

```javascript
function menuGlobal(item) {
  console.log("오늘 저녁은 " + item + this.name);
}

var myDiner = {
  name: "김치찌개",
};

var yourDiner = {
  name: "된장찌개",
};

menuGlobal.call(myDiner, "묵은지");
menuGlobal.call(yourDiner, "삼겹살");
```

### apply()

- apply 메서드는 함수를 실행할 때 인수를 배열로 묶어 한번에 전달합니다.

```javascript
function menuGlobal(item1, item2) {
  [item1, item2].forEach(function (el) {
    console.log(this);
    console.log("오늘 저녁은 " + el + this.name);
  }, this);
}

var myDiner = {
  name: "김치찌개",
};

var yourDiner = {
  name: "된장찌개",
};

menuGlobal.apply(myDiner, ["묵은지", "삼겹살"]);
menuGlobal.apply(yourDiner, ["두부", "애호박"]);
```

### call() 과 apply()의 차이

- call은 함수를 실행할 때 전달할 인수를 하나 하나 전달한다면
- apply는 전달할 인수를 배열로 묶어 한번에 전달합니다. 그래서 인수를 두개만 사용합니다.
- 인수를 배열로 보낸다는 점 빼고는 call과 apply는 동일한 기능을 수행합니다.

### bind()

- bind 메서드는 es5에서 추가되었습니다.
- this 값을 어디서 사용하든 호출 객체가 바뀌지 않게 고정시켜버립니다.

```javascript
function menuGlobal(item) {
  console.log("오늘 저녁은 " + item + this.name);
}

var myDiner = {
  name: "김치찌개",
};

var yourDiner = {
  name: "된장찌개",
};

var menuGlobalForMe = menuGlobal.bind(myDiner);
var menuGlobalForYou = menuGlobal.bind(yourDiner);

console.log(menuGlobalForMe("묵은지"));
console.log(menuGlobalForYou("삼겹살"));

myDiner.menuMine = menuGlobalForYou;
myDiner.menuMine("묵은지");
```

## 화살표 함수와 this

- 화살표 함수의 this는 일반적인 this처럼 함수를 호출한 객체를 할당하지 않고, 바로 상위 스코프의 this를 할당합니다.

```javascript
function menuGlobal(item1, item2) {
  [item1, item2].forEach((el) => {
    console.log("오늘 저녁은 " + el + this.name);
  });
}

var myDiner = {
  name: "김치찌개",
};

var yourDiner = {
  name: "된장찌개",
};

menuGlobal.apply(myDiner, ["묵은지", "삼겹살"]);
menuGlobal.apply(yourDiner, ["두부", "애호박"]);
```

## 정리해 봅시다.

- this는 함수를 호출하는 객체를 의미합니다.
- call과 apply는 this에 할당되는 객체를 지정할 수 있습니다.
- bind 메서드는 this에 할당되는 객체가 고정된 새로운 함수를 생성합니다.
- 화살표 함수에서 this는 상위 스코프의 객체를 할당받습니다.

# BEM 방식

CSS 클래스 네임을 어떻게 지으면 좋은지에 대한 방법론입니다.

## 1. BEM의 기본 구조

**BEM**은 `Block`, `Element`, `Modifier` 를 뜻합니다.

세 가지로 구성된 이름을 짓는 것 입니다.

그리고 각각 `__` , `--` 로 구분합니다.

```css
.header__navigation--navi-text {
  color: red;
}
```

위 코드에서 `header` 는 `Block`, `naviagtion` 은 `Element`, `navi-text` 는 `Modifier` 가 됩니다.

BEM은 기본적으로 ID를 사용하지 않으며, class만을 사용합니다.

또, '어떻게 보이는가'가 아니라 **'어떤 목적인가'** 에 따라 이름을 짓습니다.

## 2. Block / Element / Modifier

### Block

**재사용 가능한 기능적으로 독립적인 페이지 컴포넌트** (A functionally independent page component that can be reused)을 블럭이라고 부릅니다.

또, 블럭은 블럭을 감쌀 수 있습니다.

`.>header>.logo` 는 header라는 블럭 안에 logo라는 블럭 안에 logo라는 블럭이 들어간 형태입니다.

### Element

엘리먼트는 **블럭을 구성하는 단위** 입니다.

블럭은 독립적인 형태인 반면, 엘리먼트는 의존적인 형태입니다.

자신이 속한 블럭 내에서만 의미를 가지기 때문에 블럭 안에서 떼어다 다른 데 쓸 수 없습니다.

```html
<form class="search-form">
  <input class="search-form__input" />
  <button class="search-form__button">Search</button>
</form>
```

위 코드에서 `.search-form` 은 블럭이고, `.search-form__input` 과 `.search-form__button` 은 엘리먼트입니다.

엘리먼트 또한 중첩이 가능합니다.

`.block > .block__element1 > .block__elements2` 도 가능하다는 겁니다.

따라서 BEM은 아래와 같이 사용하지 않습니다.

```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__content__input" />
    <button class="search-form__content__button">Search</button>
  </div>
</form>
```

위 형태는 block-name\_\_element-name이란 형식을 따르고 있지 않습니다.

대신에 아래와 같이 사용합니다.

```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input" />
    <button class="search-form__button">Search</button>
  </div>
</form>
```

### Modifier

모디파이어는 **블럭이나 엘리먼트의 속성** 을 담당합니다.

```html
<ul class="tab">
  <li class="tab__item tab__item--focused">탭 01</li>
  <li class="tab__item">탭 02</li>
  <li class="tab__item">탭 03</li>
</ul>
```

위 코드는 `--focused` 가 수식어에 해당합니다.

저렇게 작성된 걸 **불리언(boolean) 타입**이라고 하는데, 그 값이 true라고 가정하고 사용합니다.

다른 타입도 있습니다. 바로 **키-밸류(key-value)** 타입도 있습니다.

이것은 하이픈으로 성질-내용을 작성합니다.

```html
<div class="column">
  <strong class="title">일반 로그인</strong>
  <form class="form-login form-login--theme-normal">
    <input type="text" class="form-login__id" />
    <input type="password" class="form-login__password" />
  </form>
</div>

<div class="column">
  <strong class="title title--color-gray">VIP 로그인 (준비중)</strong>
  <form class="form-login form-login--theme-special form-login--disabled">
    <input type="text" class="form-login__id" />
    <input type="password" class="form-login__password" />
  </form>
</div>
```

위 예시에서 `color-gray` , `theme-normal` , `theme-special` 가 key-value 타입입니다.

`disabled` 가 boolean 타입입니다.

출처 : [https://nykim.work/15](https://nykim.work/15)

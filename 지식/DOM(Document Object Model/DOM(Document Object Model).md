# DOM이란?

- 문서 객체 모델(The Document Object Model, 이하 DOM)은 HTML, XML 문서의 프로그래밍 interface이다.
- DOM은 문서의 구조화된 표현 (structured representation)을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다.
- DOM은 구조화된 nodes와 property 와 method를 갖고 있는 objects로 문서를 표현한다.
- 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 담당한다.

---

- 웹 페이지는 일종의 문서(document)다.
- 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 웹 브라우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다.
- 동일한 문서를 사용하여 이처럼 다른 형태로 나타날 수 있다는 점에 주목할 필요가 있다.
- DOM은 동일한 문서를 표현하고, 저장하고, 조작하는 방법을 제공한다. DOM은 웹 페이지의 객체 지향 표현이며, 자바스크립트와 같은 스크립팅 언어를 이용해 DOM을 수정할 수 있다.

---

- [W3C DOM](https://dom.spec.whatwg.org/), [WHATWG DOM](https://dom.spec.whatwg.org/) 표준은 대부분의 브라우저에서 DOM을 구현하는 기준이다.
- 많은 브라우저들이 표준 규약에서 제공하는 기능 외에도 추가적인 기능들을 제공하기 때문에 사용자가 작성한 문서들이 각기 다른 DOM이 적용된 다양한 브라우저 환경에서 동작할 수 있다는 사실을 항상 인지하고 있어야 한다.

- 예를 들어, 표준 DOM에서는 문서 안에서 모든 `<p>` elements 에 대한 list를 리턴하는 `getElementsByTagName` method를 정의하고 있다.

```javascript
var paragraphs = document.getElementsByTagName("P");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```

- 웹 페이지를 수정하거나 생성하는데 사용되는 모든 property, method, event들은 objects로 구성된다.
- 예를 들어 document object는 document 자체를 의미하며, table object는 HTML table에 접근하기 위한 HTMLTableElement DOM 인터페이스를 구현한 것이다.
- 이 문서는 Gecko 기반의 브라우저에서 구현된 DOM에 대한 object-by-object reference를 제공한다.

<!-- 출처 : [DOM 소개](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction) -->

# 브라우저 구조

<img width="862" alt="스크린샷 2021-09-08 오전 12 22 52" src="https://user-images.githubusercontent.com/81012135/132370642-d85d4ebf-b9d3-4348-9301-836a72810990.png">

- User Interface : 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분
- Browser Engine : User Interface와 Rendering Engine 사이의 동작을 제어
- Rendering Engine : 요청한 콘텐츠를 표시, HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함
- NetWorking: HTTP 요청과 같은 네트워크 호출에 사용됨
- Javascript Interpreter(또는 Engine) : 자바스크립트 코드를 해석하고 실행함. 크롬에서는 V8 엔진을 사용함
- Display Backend : 기본적인 위젯 (콤보 박스 등..)을 그림
- Data Persistence : Local Storage, 쿠키 등 클라이언트 사이드에서 데이터를 저장하는 영역

# 렌더링 엔진

- 렌더링 엔진의 역할은 요청받은 내용을 브라우저 화면에 나타내는 일입니다. HTML, CSS, JavaScript 등의 파일을 브라우저가 화면에 표시할 수 있도록 변환하여 픽셀 단위로 나타냅니다.

## 렌더링 엔진들

- 브라우저마다 사용하는 렌더링 엔진들이 다릅니다. 렌더링 엔진이 브라우저마다 다르기 때문에, 같은 소스가 브라우저마다 다르게 그려지는 크로스 브라우징 이슈가 발생하게 됩니다. (자바스크립트 엔진이 달라 발생하기도 합니다.)

| 브라우저 | 렌더링 엔진                 |
| :------- | :-------------------------- |
| IE       | Trident                     |
| Edge     | EdgeHTML, Blink             |
| Chrome   | Webkit, Blink(버전 28 이후) |
| Safari   | Webkit                      |
| FireFox  | Gecko                       |

- 크롬 브라우저(정확히 크로미움은)는 사파리 브라우저에서 사용하는 Webkit을 사용하다가 버전 28 이후 Webkit 소스를 Fork 하여 Blink 엔진을 만들어 사용하고 있습니다.

### 참고 : 크로미움이란?

- 크롬은 크로미움 기반으로 만들어진 브라우저라는 이야기를 많이 들어보셨을 것입니다. 크로미움은 오픈 소스 웹 브라우저입니다.
- 크로미움은 V8이라는 자바스크립트 엔진과 Blink라는 렌더링 엔진을 사용하는 브라우저입니다. 크롬이 크로미움 기반으로 만들어졌다는 것은 오픈 소스인 크로미움 브라우저 코드 위에 살을 덧붙여 개발되었다는 의미입니다.
- 크로미움 기반의 크롬이 절반 이상 점유율을 차지하고 있습니다. 이제 Edge 브라우저도 크로미움 기반의 브라우저가 되었습니다. Edge 브라우저가 사용하던 EdgeHTML 렌더링 엔진을 포기하고 크로미움 기반의 브라우저를 만들겠다고 발표를 했습니다.

## 동작 과정 요약

- 렌더링 엔진은 요청한 문서의 내용을 얻는 것에서 시작합니다. 문서는 보통 8KB 단위로 전송됩니다.

<img width="866" alt="스크린샷 2021-09-08 오전 12 39 55" src="https://user-images.githubusercontent.com/81012135/132373252-dcdddcd8-d0b7-4d39-a2eb-0e5d00adac51.png">

(위 그림은 렌더링 엔진의 기본 동작 과정)

- 렌더링 엔진은 HTML 문서를 파싱하여 DOM 트리를 만들고, CSS 문서를 파싱하여 CSSOM 트리를 만듭니다. DOM과 CSSOM을 이용하여 렌더 트리를 만듭니다.
- 렌더 트리 생성이 끝나면 Layout(Reflow)이 시작됩니다. 이 과정은 각 노드가 화면의 정확한 위치에 표시하기 위해 위치와 크기를 계산하는 과정을 말합니다. 마지막으로 계산된 위치과 크기 등의 스타일들이 실제 픽셀로 표현하는 과정이 시작됩니다. 이 과정을 Paint(Rasterizing)라고 합니다.

## 동작 과정 상세

<img width="873" alt="스크린샷 2021-09-08 오전 12 45 07" src="https://user-images.githubusercontent.com/81012135/132373950-548dabcc-7178-44ee-ac90-84cbea91fe84.png">

(위의 그림은 Webkit의 렌더링 동작 과정)

1. **HTML**을 **파싱**하여 DOM 노드를 만듭니다. 이 **DOM 노드들을 병합**하여 **DOM 트리**를 만듭니다.
2. **CSS**를 **파싱**하여, **스타일 규칙**을 만듭니다.
3. **DOM 트리**와 **스타일 규칙**을 사용하여, **Attachment**라는 과정을 통해 **Render 트리**를 생성합니다.
4. **Render 트리**를 **배치(Layout)**합니다
5. **Render 트리**를 화면에 **그림(Painting)**니다.

(위의 5가지 과정을 통해 브라우저는 렌더링을 합니다.)

# Parser

- 파싱은 서버로부터 전송받은 문서의 문자열을 브라우저가 이해할 수 있는 구조로 변환하는 과정을 파싱이라고 합니다.
- 파싱 결과는 문서 구조를 나타내는 노드 트리인데, 파싱 트리(parse tree) 또는 문법 트리(syntax tree)라고 합니다.

## DOM (Document Object Model)

<img width="816" alt="스크린샷 2021-09-08 오전 12 54 41" src="https://user-images.githubusercontent.com/81012135/132375151-86aef128-575c-45f5-b1a6-71daffbafda2.png">

(위 그림은 DOM을 파싱하는 과정)

<img width="845" alt="스크린샷 2021-09-08 오전 12 56 49" src="https://user-images.githubusercontent.com/81012135/132375468-753071ad-76ba-4cea-90ff-02659e8dea1b.png">

1. 변환(Conversion) : HTML의 원시 바이트 (raw bytes)를 읽어와 해당 파일에 지정된 인코딩(UTF-8 등..)에 따라 문자열로 변환하는 과정입니다.
2. 토큰화(Tokenizing) : 문자열을 W3C HTML5표준에 따라 고유 토큰(`<html>, <body> 등,` 꺽쇠괄호로 묶인 문자열)으로 변환합니다. 각 토큰은 특별한 의미와 고유한 규칙을 가집니다.
3. 렉싱(Lexing) : 토큰을 해당 속성 및 규칙을 정의한 객체(Nodes)로 변환합니다.
4. DOM 생성 (DOM construction) : HTML은 상위-하위 관계로 정의할 수 있어, 트리 구조로 나타낼 수 있습니다. 렉싱 과정을 거쳐 생성된 노드들을 트리 구조로 변환합니다.

<img width="677" alt="스크린샷 2021-09-08 오전 1 01 36" src="https://user-images.githubusercontent.com/81012135/132376112-c3a0ba2b-7945-4ee8-ad04-df5d5e29a364.png">

위에서 이야기한 4가지 과정을 모두 거치면 위의 그림과 같은 트리 형태의 DOM이 만들어집니다. 브라우저는 이후 모든 페이지 처리를 이 DOM를 사용합니다.

## CSSOM (CSS Object Model)

<img width="743" alt="스크린샷 2021-09-08 오전 1 03 54" src="https://user-images.githubusercontent.com/81012135/132376435-97206969-61e8-4bd5-be7b-a2b142518b55.png">

이번에는 위의 그림과 같이 CSS를 파싱하는 부분을 이야기하도록 하겠습니다.

<img width="850" alt="스크린샷 2021-09-08 오전 1 05 12" src="https://user-images.githubusercontent.com/81012135/132376530-a745c0f7-1e31-4af6-b8d0-c880aa660e1c.png">

위의 그림과 같이 DOM을 생성하는 과정 그대로 CSSOM을 생성합니다.

- 브라우저는 DOM을 생성하는 동안 외부 CSS를 참조하는 `<link>` 태그를 만나게 되면 브라우저에 리소스를 요청합니다. CSS의 원시 바이트 (raw bytes)가 문자열로 변환된 후 차례로 토큰과 노드로 변환되고 마지막으로 CSSOM(CSS Object Model) 이라는 트리 구조를 만듭니다.

<img width="589" alt="스크린샷 2021-09-08 오전 1 08 06" src="https://user-images.githubusercontent.com/81012135/132376959-6414bf98-238a-4b3b-80ea-6f3fc67fb96b.png">

- CSSOM이 트리 구조를 가지는 이유는 하향식으로 규칙을 적용하기 때문입니다. 최종 스타일을 계산할 때 브라우저는 해당 노드에 적용 가능한 가장 일반적인 규칙으로 시작해 더 구체적인 규칙을 적용하는 방식입니다.

- 위의 CSSOM 트리 그림을 보시면 하향식 규칙 적용을 좀 더 쉽게 이해할 수 있습니다. body태그 내에 있는 span태그 안에 포함된 텍스트의 크기는 16px이고 빨간색입니다. 하지만 span태그가 p태그의 하위인 경우 해당 콘텐츠는 표시되지 않습니다.

## 참고 : JaveScript와 CSS

- HTML과 CSS, 자바스크립트를 파싱하여 렌더 트리를 형성하고 화면에 그리는 과정을 최적화하면 브라우저의 렌더링 속도를 높여 사용성을 개선할 수 있습니다. 자바스크립트와 CSS와 렌더링 과정에 어떤 영향을 미치는지 살펴보도록 하겠습니다.

### JavaScript

- 자바스크립트는 파서 차단 리소스(parser blocking resource)입니다. 브라우저는 문서를 파싱하다가 자바스크립트를 만나면 진행하던 파싱을 중지하고 자바스크립트 엔진에게 권한을 넘겨 자바스크립트를 파싱하고 실행합니다.
- 자바스크립트가 실행되는 동안 문서의 파싱은 중단됩니다. 자바스크립트는 파싱을 중단시키기 때문에, 보통 자바스크립트를 head태그가 아닌 body태그가 닫히기 바로 전에 사용되도록 하는 것이 좋습니다.
- script태그에 defer 속성을 주면, 문서 파싱은 중단되지 않고 문서 파싱이 완료된 이후에 자바스크립트가 실행됩니다.
- HTML5에서 스크립트를 비동기(async)로 처리하는 속성이 추가되었습니다. 자바스크립트가 별도의 맥락에 의해 파싱 되고 실행된다.

<br>

[async와 defer](https://beomy.github.io/tech/browser/async-defer/)에서 defer속성과 async속성의 차이를 확인하실 수 있습니다.

### CSS

- CSS는 렌더링 차단 리소스(render blocking resource)입니다. CSS는 렌더링을 할 때 반드시 필요한 리소스이기 때문에 브라우저는 빠르게 CSS를 다운로드하는 것이 좋습니다. head태그 안에서 정의하여 빠르게 리소스를 받을 수 있도록 해야 합니다.
- CSS는 DOM트리를 변경하지 않기 때문에 문서 파싱을 기다리거나 중단할 이유가 없습니다. 그러나 자바스크립트에서 스타일 정보를 요청하는 경우, CSS가 파싱되지 않은 상태라면 스크립트 에러가 발생할 수 있습니다.
- 이런 문제를 해결하기 위해 파이어폭스는 로드 중이거나 파싱 중인 CSS가 있는 경우 모든 자바스크립트 실행을 중지합니다. 반면 웹킷은 로드되지 않은 CSS 가운데 문제가 될 만한 속성이 있을 때에만 자바스크립트를 중단합니다.

# Attachment

- CSSOM 트리와 DOM 트리를 결합하여, 표시해야 할 순서로 내용을 그려낼 수 있도록 하기 위해 렌더 트리를 형성합니다. 이 과정을 웹킷에서는 Attachment라고 합니다. 렌더 트리는 화면에 표시되는 각 노드의 위치를 계산하는 레이아웃에 사용되고 픽셀을 화면에 그리는 페인트 과정에도 사용됩니다.

## 렌더 트리 구축

<img width="604" alt="스크린샷 2021-09-08 오전 1 24 27" src="https://user-images.githubusercontent.com/81012135/132379007-4b385e57-fdaf-4070-aa7e-492ffea85d36.png">

- 위의 그림의 Attchment 과정을 이야기하도록 하겠습니다. 브라우저가 DOM 및 CSSOM을 렌더 트리에 결합합니다. 렌더 트리는 페이지에 표시되는 모든 DOM 콘텐츠와 각 노드에 대한 모든 CSSOM 스타일 정보를 가집니다.

<img width="871" alt="스크린샷 2021-09-08 오전 1 26 21" src="https://user-images.githubusercontent.com/81012135/132379262-4006952b-7ec4-4a53-8d15-d38b1a81e56a.png">

- 렌더 트리를 생성하려면 브라우저는 대략 3가지 작업을 수행합니다
  1. DOM 트리의 루트에서 시작하여 화면에 표시되는 노드 각각을 탐색합니다.
  - 화면에 표시되지 않는 일부 노드들(script, meta 태그 등)은 렌더 트리에 반영되지 않습니다.
  - CSS에 의해 화면에서 숨겨지는 노드들은 렌터 트리에 반영되지 않습니다. 위의 예시에서 span 노드의 경우 display:none이 설정되기 때문에 렌더 트리에 반영되지 않습니다.
  2. 화면에 표시되는 각 노드에 대해 적절하게 일치하는 CSSOM 규칙을 찾아 적용합니다.
  3. 화면에 표시되는 노드를 콘텐츠 및 계산된 스타일과 함께 보냅니다.

## DOM 트리와 렌더 트리의 관계

- 렌더 트리 구축의 1번에서 잠깐 이야기 한 것처럼 화면에 표시되지 않는 노드들은 렌더 트리에 포함되지 않습니다. 예를 들어, head태그와 같은 비시각적 DOM 노드는 렌더 트리에 추가되지 않습니다.
- 뿐만 아니라 CSS로 인해 display속성에 none값이 할당된 노드들을 렌더 트리에 추가되지 않습니다. 하지만, visibility: hidden은 렌더 트리에 포함됩니다. visibility 속성에 hidden 값이 할당된 노드는 공간을 차지하기 때문에 렌더 트리에 포함됩니다.

# Layout

<img width="361" alt="스크린샷 2021-09-08 오전 1 32 41" src="https://user-images.githubusercontent.com/81012135/132380052-526fd03a-c47f-49e9-854d-96c0288fe81d.png">

- 렌더 트리가 생성되고, 기기의 뷰포트 내에서 렌더 트리의 노드가 정확한 위치와 크기를 계산하는 과정을 Layout(혹은 Reflow)라고 합니다. 모든 상대적인 측정값은 화면에서 절대적인 픽셀로 변환됩니다. 즉 CSS에 상대적인 값인 %로 할당된 값들은 절대적인 값은 px단위로 변환 됩니다.

# Painting

<img width="861" alt="스크린샷 2021-09-08 오전 1 34 24" src="https://user-images.githubusercontent.com/81012135/132380236-4cb3ba76-bb69-4940-b875-d0c4bd363008.png">

- 렌더 트리의 각 노드를 화면의 실제 픽셀로 나타내는 과정을 Painting(혹은 Rasterizing)라고 합니다. Painting 과정 후 브라우저 화면에 UI가 나타나게 됩니다.

# 요약

- 지금까지 이야기 했던 내용들을 핵심만 요약하여 5가지로 정리해 보면,
  1. HTML 마크업을 처리하고 DOM 트리를 빌드합니다. (DOM 파싱)
  2. CSS 마크업을 처리하고 CSSOM 트리를 빌드합니다. (CSS 파싱)
  3. DOM 및 CSSOM을 결합하여 렌더 트리를 형성합니다. (Attachment)
  4. 렌더 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산합니다.(Layout)
  5. 개별 노드를 화면에 페인트 합니다.(Painting)

<!-- 춢처 : https://beomy.github.io/tech/browser/browser-rendering/ -->

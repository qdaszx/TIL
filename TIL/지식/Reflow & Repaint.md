# Reflow or Repaint(or ReDraw) 과정 설명 및 최적화 방법

## Reflow 발생

- 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 **모든 노드**의 수치를 다시 계산하여(Recalculate), 렌더 트리를 재생성하는 과정이며 또한, **Reflow** 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 **Repaint** 라 합니다.

- Reflow 발생 순서
  1. Click 이벤트 handler
  2. Recalcurate (변경된 스타일 수치 계산 수행)
  3. Layout (Reflow 과정 수행)
  4. Paint (Repaint 과정 수행)

## Repaint 발생

- Reflow 발생 이유와 같이 스타일의 모든 변경이 레이아웃 수치에 영향을 받는 것은 아닙니다.
- 즉, background-color, visibility, outline 등의 스타일 변경 시에는 레이아웃 수치가 변경되지 않으므로 Reflow 과정이 생략된 Repaint 과정만 일어나게 됩니다.

- Repaint 발생 순서 (색상 변경만 있을 때)
  1. Click 이벤트 handler
  2. Recalcurate (변경된 스타일 수치 계산 수행)
  3. Paint (Repaint 과정 수행)

## Reflow 과정이 일어나는 상황

- 노드의 추가 또는 제거시
- 요소의 위치 변경 시
- 요소의 크기 변경 시 (margin, padding, border, width, height 등..)
- 폰트 변경과 (텍스트 내용) 이미지 크기 변경 시 (크기가 다른 이미지로 변경 시)
- 페이지 초기 랜더링 시 (최초 Layout 과정)
- 윈도우 리사이징 시

## Reflow 최적화 방법

- 클래스 변화에 따른 스타일 변경 시, 최대한 DOM 구조 상 끝단에 위치한 노드에 주어야 합니다.

  - 가급적 말단에 위치한 노드 수치 변경 시 리플로우 수행 반경을 전체 노드가 아닌 일부 노드로 제한 시킬 수 있습니다. 즉, Reflow 수행 비용을 줄일 수 있다는 말과 같습니다. (하지만 실무 작업 시 적용 가능한 범위가 크지 않다)

- 인라인 스타일을 최대한 배제하라

  - 적용 시 코드 가독성과 Reflow 비용을 줄일 수 있습니다.

- 애니메이션이 들어간 노드는 가급적 position:fixed 또는 position:absolute로 지정하여 전체 노드에서 분리 시키도록 합니다.
  - 보통 (JS + CSS)를 활용한 애니메이션 효과는 해당 프레임에 따라 무수히 많은 Reflow 비용이 발생하게 됩니다.
  - 하지만 position 속성을 "fixed" 또는 "absolute"로 값을 주면 지정된 노드는 전체 노드에서 분리됩니다.
  - 즉, 전체 노드에 걸쳐 Reflow 비용이 들지 않으며, 해당 노드의 Repaint 비용만 들어가게 됩니다.
  - 또한, 노드의 position 값을 초기에 적용하지 않았더라도 애니메이션 시작 시 값을 변경 (fixed, absolute)하고 종료 시 다시 원복 시키는 방법을 사용해도 무관합니다.

<!-- Reflow or Repaint(or ReDraw)과정 설명 및 최적화 방법

출처: https://webclub.tistory.com/346 [Web Club] -->

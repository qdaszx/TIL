# CORS (Cross-Origin Resource Sharing) 란 무엇인가?

### Ajax에는 Same Origin Policy라는 원칙이 있음

- 현재 브라우저에 보여지고 있는 HTML을 내려준 웹서버(Origin - 동일 도메인, 동일 port, 동일 프로토콜)에게만 Ajax 요청을 보낼 수 있음
- CORS가 미 구현된 웹브라우저에서는 다른 도메인 간 통신이 불가능
- 우회 방법으로 JSONP, IFRAME IO, CrossDomain Proxy 등이 고안됨 (Get만 허용 및 보안 취약, 동기 호출 안됨 등 문제있음)
- HTML5에서 다른 도메인 간 통신이 가능한 스펙이 추가되었는데 바로 CORS이다.

## Preflight Request

  <img width="606" alt="스크린샷 2021-09-11 오전 11 02 30" src="https://user-images.githubusercontent.com/81012135/132932741-e8629ca9-d221-4422-9efe-a28d702fc47d.png">

- 실제 요청을 보내도 안전한지 판단하기 위해 preflight 요청을 먼저 보낸다.
- Preflight Request는 actual 요청 전에 인증 헤더를 전송하여 서버의 혀용 여부를 미리 체크하는 테스트 요청이다.
- 이 요청으로 트래픽이 증가할 수 있는데 서버의 헤더 설정으로 캐쉬가 가능
- 브라우저에서는 다른 도메인으로 보내게 될 때 해당 도메인에서 CORS를 허용하는지 알아보기 위해 preflight 요청을 보내는데 이에 대한 처리가 필요
  - [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
- preflight 요청은 OPTIONS 메서드를 사용하며 "Access-Control-Request-\*" 형태의 헤더로 전송

```
...
User-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36
Access-Control-Request-Method: POST
Access-Control-Request-Headers: charset, x-requested-with, if-modified-since, content-type
Accept: */*
...
```

- Access-Control-Request-\*

  - Access-Control-Request-Method : actual 요청 시에 사용하는 메서드를 지정
  - Access-Control-Request-Headers : actual 요청 시에 전송하는 헤더를 지정

### preflight 단계

- 1 동일한 URL에 OPTION method로 요청을 보냄 (preflight)
- 2 1요청에 대해 서버에서는 허용되는 method, 허용하는 헤더, 쿠키 허용여부 등을 응답
- 3 2요청의 응답이 요청을 허용하는 조건이라면 실제로 요청을 보냄

### preflight 없이 actual 만 요청되는 경우

- GET, HEAD, POST (Content-type 이 application/x-www-form-urlencoded, multipart/form-data, text/plain 인 경우) 메서드를 사용하는 경우
- custom header 를 추가하지 않는 경우

## CORS 적용 방법 : 클라이언트

- 클라이언트는 기존 Ajax 요청과 동일하게 구현
- 요청하는 URL의 출처 (origin)가 다른 경우 XMLHttpRequest 객체가 preflight, actual 요청을 자동으로 처리 함.
  > ⚠️ 쿠키를 전송해야 하는 경우 XMLHttpRequest의 withCredentials를 true로 설정해야 하고 서버에서 "Access-Control-Allow-Credentials" 헤더를 true로 설정해야만 서버와 클라이언트 간 쿠키 전송이 가능.

## CORS 적용 방법 : 서버

- CORS에서 preflight 요청은 OPTIONS 메서드를 사용하기 때문에 웹서버에서 OPTIONS 메서드를 허용하는지 확인이 필요함

### Apache httpd.conf에 적용 예

```
<IfModule mod_headers.c>
        SetEnvIf Origin "http://(.+\.)?(gurubee.net|oracleclub.com)$" AccessControlAllowOrigin=$0
        Header set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
        Header set Access-Control-Allow-Credentials "true"
        Header set Access-Control-Allow-Headers "Charset, Content-Type, X-Requested-With, Accept"
        Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE, HEAD"
</IfModule>
```

### JAVA 적용 예

```
public class CorsFilter extends CORSRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException
    {
        //logger.info ("[Filter] CorsFilter called");
        HttpServletResponse response = (HttpServletResponse) httpServletResponse;

        response.setHeader("Access-Control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "Charset, Content-Type, X-Requested-With, Accept");


        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
```

  <!-- 출처 : http://wiki.gurubee.net/display/SWDEV/CORS+%28Cross-Origin+Resource+Sharing%29? -->

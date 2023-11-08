## [movieql-server](https://github.com/kor-seonwoo/movieql-server)를 활용한 간단한 MOVIE SPA 만들기
### 목표
노마드 코더 <GraphQL로 영화 웹 앱 만들기> 강의를 들으며 실습한 내용을 토대로
- <code>GraphQL</code> 쿼리 언어에 익숙해지기.
- <code>apollo/client</code>의 <code>useQuery</code> 훅을 사용하여 <code>{ data, loading, error, client }</code> 등을 활용해보기.
- 실제 API에 <code>fetching</code>하지 않고 <code>InMemoryCache</code>에 <code>writeFragment</code>를 활용한 각각의 캐시에 <code>isLiked</code> 필드 추가해보기.

### 사용스펙
- <code>React</code>
- <code>react-router-dom v6</code>
- <code>styled-components</code>
- <code>graphql</code>
- <code>@apollo/client</code>

### 구동모습
![movieql-client_01](https://github.com/kor-seonwoo/movieql-client/assets/74663731/a4122d3d-826e-4483-bc0f-4c8ea047168b)

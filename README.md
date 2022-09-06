# Tapplace API v1.1

### 임시 주소

[https://api.tapplace.cloud](https://api.tapplace.cloud)          “key”:”1234”

## 변경사항(1.0 → 1.1)

1. store/around 리턴값 중 피드백 없는 store 포함 안하게 변경
2. 공지사항 테이블 ‘notice’ 생성 & CRUD API 추가
3. 개인정보 날짜, 이용약관 날짜 저장하는 테이블  ‘terms’ 생성 & CRUD API추가
4. 관리자 테이블 ‘admin’ 생성 & 관리자 로그인 추가
5. 결제수단 ‘toss’ 추가
6. 시작 화면과 /userlog 시 반환되는 paylist 데이터 삭제( /userlog 리턴값 terms 데이터로 대체)
7. 배열로 되어있던 리턴타입 json 형식으로 통일

## Pay 리스트 (= ~pay 테이블명 && pay 컬럼 값)

1. kakaopay
2. naverpay
3. payco
4. zeropay
5. apple_visa
6. apple_master
7. apple_jcb
8. conless_visa (contactless)
9. conless_master
10. conless_amex (american express)
11. conless_union
12. conless_jcb
13. google_visa
14. google_master
15. google_maestro
16. toss

## API 구성

### 화면1) 설정

![2.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/2.png)

### 화면2) 주변찾기

![3.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/3.png)

### 화면3) 주변찾기 - 가게선택

![4.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/4.png)

### 화면4) 등록 - 가게선택

![5.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/5.png)

### 화면5) 피드백

![6.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/6.png)

### 화면6) 공지사항

![7.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/7.png)

### API

| Method | Endpoint | Request body | Return | When to use | 구현 현황 |
| --- | --- | --- | --- | --- | --- |
| POST | /user | { user(T), key } | true or ERROR | 최초 설정 | O |
| PATCH | /user/pays | { user_id, pays[ ], key } | true or ERROR | 관심 pay 수정 | O |
| POST | /userlog | { user_id, key } | { terms(T) } | 어플 실행 | O |
| POST | /store/around | { x1, y1, distance, pays[ ] } | { stores[ ] } | 주변 찾기 | O |
| POST | /pay/list | { store_id, pays[ ] } | { store(T), feedback[ ] }  | 주변 찾기 → 가게 선택 | O |
| POST | /pay/list/check | { store(T), pays[ ] } | { feedback[ ] } | 등록 → 가게 선택 | O |
| PATCH | /pay/feedback | { store_id,key, user_feedback[ ] } | { feedback_result [ ] } | 주변 찾기 & 등록→ 가게 선택 → 피드백 | O |
| POST | /pay/list/more | { store_id, pays[ ] } | { feedback[ ] } | 피드백 → 결제수단 더보기 | O |
| GET | /store/:store_id |  | { store(T) } | store_id에 맞는 store 가져옴 ( 공유하기 할때 meta데이터 표시용) | O |
| GET | /notice/:category1/:category2/:page |  | { total_count, notice [ ] } | 공지사항/자주하는 질문 | O |

### 개발할 때만  쓰는 API

| Method | Endpoint | Request body | When to use |
| --- | --- | --- | --- |
| GET | /user |  | 전체 유저 가져옴 |
| GET | /user/:user_id |  | user_id에 맞는 유저 가져옴 |
| DELETE | /user/:user_id | { key } | user_id에 맞는 유저 삭제 |
| GET | /userlog |  | user_log테이블 데이터 전부 가져옴 |
| GET | /userlog/:user_id |  | user_id에 맞는 로그 가져옴 |
| DELETE | /userlog/:user_id | { key } | user_id에 맞는 로그 삭제 |
| GET | /store |  | 등록된 store 전부 가져옴 |
| POST | /store | { store(T), key } | store 등록 |
| DELETE | /store/:store_id | { key } | store_id에 맞는 store 삭제 |
| GET | /pay/:user_id |  | 모든 pay테이블에서 user_id에 맞는 정보 가져옴 |
| POST | /pay | { pay(T), key } | pay 등록 |
| DELETE | /pay/:user_id | { pay, key } | Requesy body의 pay에 맞는 테이블에서 user_id 와 같은 데이터 삭제 |

### API 전달 값

| 이름 | 설명 | 예시 |
| --- | --- | --- |
| 테이블명(T) | 테이블명의 컬럼이 전부 포함된 값(num은 제외) | user(T) = user_id, os, birth, pays   ex) { user(T), key } = { user_id, os, birth, pays, key } |
| key | GET 이외의 방식에 전부 넣어야 하는 값 |  |
| paylist[ ] | pay_list 테이블의 데이터 전부 담은 배열 | paylist : [ ”apple_visa”, “apple_master”, “kakaopay” ….. ] |
| true or ERROR | 요청 성공 시 true 리턴 , 실패시 ERROR 발생 |  |
| stores[ ] |  | stores : [ { store(T), distance, pays[ ] }… ] |
| pays[ ] | pay_list 테이블 데이터 중 일부를 담은 배열 | pays : [ ”apple_visa”, “payco” ] |
| distance | 주변 찾기 시 반경으로 설정된 값 (number) | distance : 1.5 (반경이 1.5km로 설정되었을 때) |
| x1, y1 | 주변 찾기 시 사용자 현재 위치 값 |  |
| feedback[ ] | 해당 store의 pay별 feedback 현황 | feedback : [ { pay(T), pay, exist }(feedback 결과가 있는 pay), { pay, exist }(feedback 결과가 없는 pay)  ] |
| user_feedback[ ] | feedback시 pay별 pay, exist, feed를 담은 값 | feedbacks : [ { “pay” : “apple_visa”, “exist” : false, “feed” : true }, { “pay” : “naverpay”, “exist” : true, “feed” : false } ] |
| exist | pay종류 별 기존 데이터가 존재하는지 여부값 [ true, false ] | exist : true = 기존 데이터 있음 ( pay(T)의 데이터 그대로 쓰면 됨)                                                                       exist :  false = 기존 데이터 없음                                                            |
| feed | 피드백시 success(true)또는 fail(false) 여부 값 [ true, false ] | feed : true = DB success +1  fail :  false = DB fail +1 |
| feedback_result | 피드백 후 결과값 | feedback_result : [ { “pay” : “naverpay”, “success”:10, “fail” : 2, “last_state” : “success } … ]  |
| :category1 | notice - 공지사항, qna - 자주 묻는 질문 | /notice/qna/:category2/:page |
| :category2 | all - category2 전부, 현재는 category2 가 정해진게 없어서 all로만 가능 | /notice/:category1/all/:page |
| :page | 한 화면에 표시될 페이지, 현재 1페이지당 10개로 설정. page 1 이면 1~10번 게시물, 2이면 11~20번 게시물 | /notice/:category1/:category2/1 |
| total_count | category1,category2 조건에 맞는 총 게시글 수 | total_count : “12” |
| notice[ ] | category1,category2,page 조건에 맞는 notice(T) | notice : [ { “num” : 1, “title” : “공지사항1”, “content” : “공지사항 내용”, “wriete_date” : “2022-09-04 06:40:30”, “category1” : “notice”, “category2” : “” ] |
| 나머지  | DB 컬럼의 이름에 맞는 값 |  |

## 관리자 API

| Method | Endpoint | Request body | header | Return | When to use | 구현 현황 |
| --- | --- | --- | --- | --- | --- | --- |
| POST | /admin/login | { admin_id, password } |  | JWT | 관리자 로그인 | O |
| POST | /admin/signup | { admin_id, password, role } | Authorization : Bearer JWT | true or ERROR | 관리자 등록 | O |
| POST | /terms | { personal_date, service_date } | Authorization : Bearer JWT | true or ERROR | 약관 날짜 등록 | O |
| GET | /terms |  | Authorization : Bearer JWT | { terms(T)[ ] } | 약관 날짜 전부 가져오기 | O |
| GET | /terms/:num |  | Authorization : Bearer JWT | { terms(T) }  | 특정 약관 날짜 가져오기 | O |
| PATCH | /terms/:num | { terms(T) } ( terms(T) 중 수정하고 싶은 컬럼만 넣으면 됨 ) | Authorization : Bearer JWT | true or ERROR | 특정 약관 날짜 수정 | O |
| DELETE | /terms/:num |  | Authorization : Bearer JWT | true or ERROR | 특정 약관 날짜 삭제 | O |
| POST | /notice | { title, content, category1, category2 } | Authorization : Bearer JWT | true or ERROR | 글 등록 | O |
| PATCH | /notice/:num | { notice(T) } ( notice(T) 중 수정하고 싶은 컬럼만 넣으면 됨 ) | Authorization : Bearer JWT | true or ERROR | 특정 글 수정 | O |
| DELETE | /notice/:num |  | Authorization : Bearer JWT | true or ERROR | 특정 글 삭제 | O |

## DB 구성

![Tapplace - ERD.png](Tapplace%20API%20v1%201%20c0fd668530054f399017c32a0f5ee75a/Tapplace_-_ERD.png)

### store 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| store_id | string, 유니크키 | 카카오 검색 API 호출 시 반환 되는 “id” 값 |
| place_name | string | 카카오 검색 API 호출 시 반환 되는 “place_name” 값 |
| address_name | string | 카카오 검색 API 호출 시 반환 되는 “address_name” 값 |
| road_address_name | string | 카카오 검색 API 호출 시 반환 되는 “road_address_name” 값 |
| category_group_name | string | 카카오 검색 API 호출 시 반환 되는 “category_group_name” 값 |
| x | string | 카카오 검색 API 호출 시 반환 되는 “x” 값 |
| y | string | 카카오 검색 API 호출 시 반환 되는 “y” 값 |
| phone | string | 카카오 검색 API 호출 시 반환 되는 “phone” 값 |

### ~pay 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| store_id | string, 외래키, 유니크키 | store 테이블의 store_id 참조 |
| success | number, 기본 값 : 0 | 결제 성공 피드백 값 |
| fail | number, 기본 값 : 0 | 결제 실패 피드백 값 |
| last_state | string, 값 [ ‘success’, ‘fail’ ] | 마지막으로 피드백 된 상태 |
| last_time | string | 마지막으로 피드백 된 시간 |

### pay_list 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| pay | string, 기본키 | pay 종류, pay테이블명과 같음 |

### user 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| user_id | string, 유니크키 | 사용자 기기 고유  id |
| os | string, 값 [ ‘android’, ‘ios’ ] |  사용자 운영체제 |
| birth | string, 값 [ ‘yyyy-MM-dd’ ] |  사용자 생년월일 |
| sex | string, 값 [ ‘남’, ‘여’ ] |  사용자 성별 |
| pays | string |  사용자 설정 pay종류 |

### user_log 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| user_id | string, 외래키 | user 테이블 user_id 참조 |
| time | string | 접속 시간 |

### notice 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| title | string | 글 제목 |
| content | string | 글 내용 |
| write_date | string | 글 작성일 |
| category1 | string, 값 [ ‘notice’, ‘qna’ ] | 공지사항, 자주 하는 질문  |
| category2 | string, 값 [ ‘all’ ] | 현재는 all 만 가능 |

### terms 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| personal_date | string | 개인정보 이용동의 날짜 |
| service_date | string | 서비스 이용약관 날짜 |
| regist_date | string | 등록 일자 |

### admin 테이블

| 컬럼 | 특성 | 설명 |
| --- | --- | --- |
| num | number, 기본키 | 자동으로 증가 되는 PK용 인조키 |
| admin_id | string, 유니크키 | 관리자 id |
| password | string | 비밀번호 |
| role | string, 값 [ ‘admin’ ] | 권한 |
| regist_date | string | 등록 일자 |
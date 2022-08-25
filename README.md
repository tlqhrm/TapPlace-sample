# Tapplace API v1.0

## 임시 주소
api.tapplace.cloud          “key”:”1234”

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

## API 구성

### 화면1) 어플 첫 실행

![1.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/1.png)

### 화면2) 설정

![2.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/2.png)

### 화면3) 주변찾기

![3.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/3.png)

### 화면4) 주변찾기 - 가게선택

![4.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/4.png)

### 화면5) 등록 - 가게선택

![5.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/5.png)

### 화면6) 피드백

![6.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/6.png)

### API 종류

| Method | Endpoint | Request body | Return | When to use | 구현 현황 |
| --- | --- | --- | --- | --- | --- |
| GET | /paylist |  | paylist[ ] | 어플 첫 실행 | O |
| POST | /user | { user(T), key } | true or ERROR | 최초 설정 | O |
| PATCH | /user/pays | { user_id, pays[ ], key } | true or ERROR | 관심 pay 수정 | O |
| POST | /userlog | { user_id, key } | paylist[ ] | 어플 실행 | O |
| POST | /store/around | { x1, y1, distance, pays[ ] } | { store(T), distance, pays[ ] } [ ] | 주변 찾기 | O |
| POST | /pay/list | { store_id, pays[ ] } | { store(T) } and ( { pay(T), exist, pay } or { exist, pay } ) [ ] | 주변 찾기 → 가게 선택 | O |
| POST | /pay/list/check | { store(T), pays[ ] } | { pay(T), exist, pay } or { exist, pay } [ ] | 등록 → 가게 선택 | O |
| PATCH | /pay/feedback | { store_id,key, feedbacks[ ] } | { pay, success, fail, last_state }[ ] | 주변 찾기 & 등록→ 가게 선택 → 피드백 | O |
| POST | /pay/list/more | { store_id, pays[ ] } | pay(T), exist, pay } or { exist, pay } ) [ ] | 피드백 → 결제수단 더보기 | O |
| GET | /store/:store_id |  | { store(T) } | store_id에 맞는 store 가져옴 ( 공유하기 할때 meta데이터 표시용) |  |

### 개발할 때만  쓰는 API 종류

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
| pays[ ] | pay_list 테이블 데이터 중 일부를 담은 배열 | pays : [ ”apple_visa”, “payco” ] |
| distance | 주변 찾기 시 반경으로 설정된 값 (number) | distance : 1.5 (반경이 1.5km로 설정되었을 때) |
| x1, y1 | 주변 찾기 시 사용자 현재 위치 값 |  |
| feedbacks[ ] | feedback시 pay별 pay, exist, feed를 담은 값 | feedbacks : [ { “pay” : “apple_visa”, “exist” : false, “feed” : true }, { “pay” : “naverpay”, “exist” : true, “feed” : false } ] |
| exist | pay종류 별 기존 데이터가 존재하는지 여부값 [ true, false ] | exist : true = 기존 데이터 있음 ( pay(T)의 데이터 그대로 쓰면 됨)                                                                       exist :  false = 기존 데이터 없음                                                            |
| feed | 피드백시 success(true)또는 fail(false) 여부 값 [ true, false ] | feed : true = DB success +1  fail :  false = DB fail +1 |
| 나머지  | DB 컬럼의 이름에 맞는 값 |  |

## DB 구성

![Tapplace - ERD.png](Tapplace%20API%20v1%200%207b0a3273876540488c2027bce3ad260b/Tapplace_-_ERD.png)

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
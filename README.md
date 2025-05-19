## 📖 목차

0. [🎯 미션](#-미션)
1. [👨‍💻 설계 의도](#-설계-의도)
2. [🔍 서버 Flow](#-서버-flow)
3. [✅ 준비 사항](#-준비-사항)
4. [🧪 테스트 순서](#-테스트-순서)
5. [🧾 API 명세서](#-api-명세서)
6. [⚙️ 공통 정보](#-공통-정보)

---
## 🎯 미션

🚩 이벤트 등록 / 조회\
 ✔️ 운영자, 관리자가 이벤트 생성 가능\
 ✔️ 이벤트에는 조건과 기간, 상태 정보가 포함\
 ✔️ 등록한 이벤트 목록 및 상세조회 가능\
🚩 보상 등록 / 조회\
 ✔️ 이벤트에 보상 추가 가능\
  (제 생각에는 이미 완성된 이벤트에 보상추가는\
  혼란을 야기할 수 있어, 이벤트 생성 시점에\
  추가하도록 변경했습니다.\
 ✔️ 보상은 자유롭게 구성 가능\
 ✔️ 각 보상은 어떤 이벤트에 연결되는지가 명확 (이벤트 조회시 확인 가능)\
🚩 유저 보상 요청\
 ✔️ 유저는 특정 이벤트에 대해 보상 요청 가능\
 ✔️ 시스템은 조건 충족 여부 검증\
 ✔️ 중복 보상 요청 막기. 성공시 기록\
🚩 보상 요청 내역 확인\
 ✔️ 유저는 본인의 수령 기록 확인 가능\
 ✔️ 운영자는 전체 유저의 수령 기록 조회 가능

## 👨‍💻 설계 의도

*	`Gateway` → 내부 서버 요청 시 `Adapter` 공통 함수 사용
	* 테스트 코드 작성 및 MSA 구조 확장에 유리
	* 공통 인터페이스를 통해 유지보수성 향상
	* 동일 인스턴스를 사용하여 요청 일관성과 코드 재사용성 확보
* `MSA` 전반에 걸친 공통 에러 코드 사용
	*	모든 서버가 동일한 에러 코드를 반환하도록 설계
	*	디버깅, 로깅, 사용자 응답 처리 일관성 확보
	*	추후 에러 코드만 별도 라이브러리화 가능 → 커뮤니케이션 비용 감소
* `Global Filter`를 통한 에러 처리 통합
	*	모든 예외를 ExceptionFilter에서 핸들링
  * User input validator 핸들링
	*	ApiResult는 에러 코드 및 메시지를 모은 enum-like 상수 집합
	*	`make_api_result` 함수를 통해 통일된 응답 포맷(result, code, message, data)을 제공
*	`MongoDB` 트랜잭션 로직 추상화
	* MongoDB는 기본적으로 요청 단위 처리이지만, 복수 컬렉션 조작 등 데이터 정합성이 중요한 작업을 위해 withTransaction() 함수 제공
	*	트랜잭션 시작/커밋/롤백 로직을 공통화하여, 서비스 로직은 비즈니스에만 집중할 수 있도록 설계

---

## 🔍 서버 Flow

![Image](https://github.com/user-attachments/assets/b981bcae-183f-4764-aef7-5fb76ed0bee5)

---

## ✅ 준비 사항

### 🛠️ 소프트웨어

* Docker 설치: [https://www.docker.com](https://www.docker.com)

### 🚀 실행 절차

```bash
# 프로젝트 클론
git clone https://github.com/S05p/nexon_assignment.git
cd nexon_assignment

# ⚠️ 포트 충돌 주의
# 27017 포트로 이미 MongoDB가 실행 중이면 `docker-compose.yml`의 46번째 줄 포트 변경 필요 + docker compose user & event ENV MONGO_URI 의 port도 변경

# 도커 실행
docker compose up --build
```

### 🔍 서비스 주소

* Gateway: [http://localhost:3000](http://localhost:3000)
* 또는 Docker Desktop 앱에서 컨테이너 로그 확인

---

## 🧪 테스트 순서

> **⚠️ 테스트는 아래 순서대로 진행 바랍니다.**

### 👑 Admin 테스트

1. [`[POST] /signin` (role: admin)](#1-회원가입) → jwt\_token authorization Bearer token에 입력
2. [`[POST] /rewards-admin`](#5-보상-생성-admin) → 보상 생성
3. [`[GET] /rewards-admin`](#6-보상-목록-admin) → reward list → 생성된 reward id 저장
4. [`[POST] /events-admin`](#4-이벤트-생성-admin) → reward id 포함 이벤트 생성
6. [`[GET] /events` → 전체 이벤트 목록 확인](#1-이벤트-목록-조회-all) → event id 저장

### 🙋‍♂️ User 테스트

1. [`[POST] /signin` (role: user)](#1-회원가입)→ jwt\_token authorization Bearer token에 입력
2. [`[GET] /events`](#1-이벤트-목록-조회-all) → 참여 가능한 이벤트 확인 (event\_id 저장) 
3. [`[POST] /users/kill-monster`](#5-이벤트-수행-user) → 더미 이벤트 수행 (event 조건에 맞춰서 수행)
4. [`[POST] /events/reward-receive`](#4-보상-수령-user) → 보상 수령
5. [`[GET] /events/history`](#3-참여한-히스토리-user) → 역대 이벤트 전부 출력 (보상받았는지 flag 전달)
6. [`[GET] /users/user-info`](#3-사용자-정보-조회-user) → 사용자 전체 정보 확인 (inventory에서 user item 확인)

### 🔁 Admin 재로그인

* [`[GET] /events-admin/history/{event_id}`]() → 해당 이벤트의 보상받은 유저 확인

---

## 🧾 API 명세서

### 👤 User API

#### 1. 회원가입

```http
POST /signup
```

**Body**:

```json
{
  "user_id": "string",
  "password": "string",
  "email": "string (optional)",
  "role": "user | operator | auditor | admin"
}
```

#### 2. 로그인

```http
POST /login
```

**Body**:

```json
{
  "user_id": "string",
  "password": "string"
}
```

**Response**: jwt_token 포함

#### 3. 사용자 정보 조회 (User)

```http
GET /user-info
```

#### 4. 역할 변경 (Admin)

```http
PUT /role-change
```

**Body**:

```json
{
  "uid": "string",
  "role": "user | operator | auditor | admin"
}
```

#### 5. 이벤트 수행 (User)

```http
POST /invite-friend    invite_frient_count +1
POST /kill-monster     kill_monster_count  + 99999
POST /login-count-up   login_count         + 5
```

---

### 🎉 Event API

#### 1. 이벤트 목록 조회 (All)

```http
GET /events
```
| 쿼리 파라미터     | 타입   | 필수 여부 | 기본값 | 설명                   |
|--------------|--------|-----------|--------|------------------------|
| `event_name` | string | 선택      | 없음   | 이벤트 이름 (검색용)   |
| `start_date` | Date   | 선택      | 없음   | 시작일 필터           |
| `end_date`   | Date   | 선택      | 없음   | 종료일 필터           |
| `page`       | number | 필수      | 1      | 페이지 번호           |
| `limit`      | number | 필수      | 10     | 페이지당 항목 수 (최대 100) |

#### 2. 이벤트 상세 조회 (All)

```http
GET /events/detail/:event_id
```

#### 3. 참여한 히스토리 (User)

```http
GET /events/history
```

#### 4. 보상 수령 (User)

```http
POST /events/reward-receive
```

**Body**:

```json
{
  "event_id": "string",
  "reward_id": "string"
}
```

---

### 🛠️ 관리자 전용 API

#### 1. 모든 이벤트 목록 (deactivate, delete) (Admin)

```http
GET /events-admin
```

#### 2. 이벤트 상세 (deactivate, delete) (Admin)

```http
GET /events-admin/detail/:event_id
```

#### 3. 이벤트 히스토리 (Admin)

```http
GET /events-admin/history/:event_id
```
| 쿼리 파라미터      | 타입   | 필수 여부 | 기본값 | 설명                          |
|---------------|--------|-----------|--------|-------------------------------|
| `uid`         | string | 선택      | 없음   | 사용자 UID (필터 조건)        |
| `start_date`  | Date   | 선택      | 없음   | 조회 시작일                   |
| `end_date`    | Date   | 선택      | 없음   | 조회 종료일                   |
| `page`        | number | 필수      | 1      | 페이지 번호                   |
| `limit`       | number | 필수      | 10     | 페이지당 항목 수 (최대 100)   |

#### 4. 이벤트 생성 (Admin)

```http
POST /events-admin
```

**Body**:

```json
{
  "name": "string",
  "description": "string",
  "start_date": "ISO date",
  "end_date": "ISO date",
  "reward_array": ["string", "..."], // reward의 id
  "contition_type": "login | invite_friend | kill_monster" ,
  "condition_value": "integer", // bigger then 1
  "is_active": "boolean" // default true,
}
```

#### 5. 보상 생성 (Admin)

```http
POST /rewards-admin
```
```json
{
  "name": "string",
  "description": "string",
  "type": "point | coupon | product",
  "amount": "ISO date", // bigger then 1
}
```

#### 6. 보상 목록 (Admin)

```http
GET /rewards-admin
```
| 쿼리 파라미터       | 타입   | 필수 여부 | 기본값 | 설명                      |
|----------------|--------|-----------|--------|---------------------------|
| `reward_name`  | string | 선택      | 없음   | 보상 이름 (검색용)        |
| `page`         | number | 필수      | 1      | 페이지 번호               |
| `limit`        | number | 필수      | 10     | 페이지당 항목 수 (최대 100) |

---

## ⚙️ 공통 정보

### 🔁 공통 응답 형식

**성공:**

```json
{
  "result": "success",
  "code": "string",
  "message": "string",
  "data": "any | undifiend"
}
```
**실패:**

```json
{
  "result": "failed", // msa에서 실패시 "msa_failed"
  "code": "string",
  "message": "string",
  "data": "any | undifiend"
}
```

### 🧩 공통 에러 코드

* `U001`: 알 수 없는 오류
* `U002`: 세션 만료
* `U003`: 유효하지 않은 세션
* `U004`: 권한 없음
* `B001`: 잘못된 요청
* `B002`: 경로 없음
* `V001`: 잘못된 값 전달

### 🎭 Role Enum

```ts
enum Role {
  USER = 'user',
  OPERATOR = 'operator',
  AUDITOR = 'auditor',
  ADMIN = 'admin'
}
```

### 🎭 Condition Enum

```ts
export enum ConditionType {
    LOGIN = 'login',
    INVITE_FRIEND = 'invite_friend',
    KILL_MONSTER = 'kill_monster',
}
```

### 🎭 Reward Enum
```ts
export enum RewardType {
    POINT = 'point',
    COUPON = 'coupon',
    PRODUCT = 'product',
}
```

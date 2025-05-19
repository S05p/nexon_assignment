## 📖 목차

1. [🔍 서버 Flow](#-서버-flow)
2. [✅ 준비 사항](#-준비-사항)
3. [🧪 테스트 순서](#-테스트-순서)
4. [🧾 API 명세서](#-api-명세서)
5. [⚙️ 공통 정보](#-공통-정보)

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
# 27017 포트로 이미 MongoDB가 실행 중이면 `docker-compose.yml`의 46번째 줄 포트 변경 필요

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

1. `/signin` (role: admin) → jwt\_token authorization Bearer token에 입력
2. `/rewards-admin` → 보상 생성
3. `/rewards-admin` → 생성된 reward\_id 저장
4. `/events-admin` → reward\_id 포함 이벤트 생성
5. `/events/detail/{event_id}` → 이벤트 상세 확인
6. `/events` → 전체 이벤트 목록 확인

### 🙋‍♂️ User 테스트

1. `/signin` (role: user) → jwt\_token authorization Bearer token에 입력
2. `/users/kill-monster` → 더미 이벤트 수행
3. `/events` → 참여 가능한 이벤트 확인 (event\_id 저장)
4. `/events/reward-receive` → 보상 수령
5. `/events/history` → 수령한 아이템 목록 확인
6. `/users/user-info` → 사용자 전체 정보 확인

### 🔁 Admin 재로그인

* `/events-admin/history/{event_id}` → 전체 사용자 히스토리 확인

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
POST /login-count-up   login_count         + 1 
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
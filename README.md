### 📖 목차

1. [🔍 서버 Flow](#-서버-flow)
2. [✅ 준비 사항](#-준비-사항)
3. [🧾 API 명세서](#-api-명세서)

### 🔍 서버 Flow
***
![Image](https://github.com/user-attachments/assets/b981bcae-183f-4764-aef7-5fb76ed0bee5)

### ✅ 준비 사항
***

#### 🛠️ 소프트웨어
* 환경에 맞는 Docker 설치 [링크](https://www.docker.com)

#### 🚀 프로젝트 클론 및 동작 확인
```
# 프로젝트 클론
git clone https://github.com/S05p/nexon_assignment.git
cd nexon_assignment

# docker 이미지 빌드 및 실행
docker compose up --build (최초 실행시 2~3분 소요)

# 서비스 확인
Gateway: http://localhost:3000
혹은 docker desktop 어플에서 로그를 확인
```

#### 🧪 테스트 방법
* Curl 혹은 Postman(권장)
* 회원가입, 로그인시 response로 `jwt_token` 값을 전달합니다.\
  해당 값을 Authorization의 `Bearer Token`에 넣어 Auth을 인증합니다.

### 🧾 API 명세서
***

#### User

#####  1. 회원가입
- **엔드포인트**: `POST /signup`
- **설명**: 새로운 사용자 등록
- **Request Body**:
  ```typescript
  {
    user_id: string;      // 필수
    password: string;     // 필수
    email?: string;       // 선택 (이메일 형식)
    role: Role;          // 필수 (USER, OPERATOR, AUDITOR, ADMIN 중 하나)
  }
  ```
- **Response**:
  ```typescript
  {
    result: "success" | "failed",
    code?: string,       // 실패 시 에러 코드
    message?: string,    // 실패 시 에러 메시지
    data?: any          // 성공 시 반환 데이터
  }
  ```
- **에러 코드**:
  - `A001`: "해당 아이디는 이미 존재합니다."
  - `U001`: "알 수 없는 오류가 발생했습니다."
  - `B001`: "잘못된 요청입니다."

##### 2. 로그인
- **엔드포인트**: `POST /login`
- **설명**: 사용자 로그인
- **Request Body**:
  ```typescript
  {
    user_id: string;    // 필수
    password: string;   // 필수
  }
  ```
- **Response**:
  ```typescript
  {
    result: "success" | "failed",
    code?: string,
    message?: string,
    data?: {
      jwt_token: string;
      user_id: string;
      role: Role;
    }
  }
  ```
- **에러 코드**:
  - `A002`: "해당 아이디는 존재하지 않습니다."
  - `A003`: "비밀번호가 일치하지 않습니다."

##### 3. 사용자 정보 조회
- **엔드포인트**: `GET /user-info`
- **설명**: 사용자 정보 조회
- **Request Body**:
  ```typescript
  {
    uid: string;    // 필수
  }
  ```
- **Response**:
  ```typescript
  {
    result: "success" | "failed",
    code?: string,
    message?: string,
    data?: {
      user: {
        user_id: string;
        email?: string;
        role: Role;
        created_at: Date;
        updated_at: Date;
        is_deleted: boolean;
        is_active: boolean;
      };
      user_history: {
        // 사용자 히스토리 정보
      };
      user_invite_history: Array<{
        // 사용자 초대 히스토리 정보
      }>;
    }
  }
  ```
- **에러 코드**:
  - `A002`: "해당 아이디는 존재하지 않습니다."

##### 4. 역할 변경
- **엔드포인트**: `PUT /role-change`
- **설명**: 사용자 역할 변경
- **Request Body**:
  ```typescript
  {
    uid: string;    // 필수
    role: Role;     // 필수 (USER, OPERATOR, AUDITOR, ADMIN 중 하나)
  }
  ```
- **Response**:
  ```typescript
  {
    result: "success" | "failed",
    code?: string,
    message?: string
  }
  ```
- **에러 코드**:
  - `A002`: "해당 아이디는 존재하지 않습니다."

##### 5. Event 수행 (3개)
- **엔드포인트**: `POST /invite-friend`, `POST /kill-monster`, `POST /login-count-up`, 
- **설명**: 사용자 이벤트 수행
- **Request Body**:
  전달 X
- **에러 코드**:
  - `A002`: "해당 아이디는 존재하지 않습니다."


#### Event

##### 1. 이벤트 관련 API

* 1.1 이벤트 목록 조회
```
GET /events
```
- **설명**: 현재 진행 중인 이벤트 목록을 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 목록 조회 성공",
  "data": [
    {
      "event_id": "string",
      "title": "string",
      "description": "string",
      "start_date": "string (ISO date)",
      "end_date": "string (ISO date)",
      "status": "string (ACTIVE/INACTIVE)",
      "rewards": [
        {
          "reward_id": "string",
          "name": "string",
          "description": "string",
          "type": "string (ITEM/COIN/ETC)",
          "amount": "number"
        }
      ]
    }
  ]
}
```

* 1.2 이벤트 상세 조회
```
GET /events/detail/:event_id
```
- **설명**: 특정 이벤트의 상세 정보를 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 상세 조회 성공",
  "data": {
    "event_id": "string",
    "title": "string",
    "description": "string",
    "start_date": "string (ISO date)",
    "end_date": "string (ISO date)",
    "status": "string (ACTIVE/INACTIVE)",
    "rewards": [
      {
        "reward_id": "string",
        "name": "string",
        "description": "string",
        "type": "string (ITEM/COIN/ETC)",
        "amount": "number"
      }
    ]
  }
}
```

* 1.3 이벤트 히스토리 조회
```
GET /events/history
```
- **설명**: 사용자의 이벤트 참여 히스토리를 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 히스토리 조회 성공",
  "data": [
    {
      "event_id": "string",
      "title": "string",
      "participated_at": "string (ISO date)",
      "rewards_received": [
        {
          "reward_id": "string",
          "name": "string",
          "received_at": "string (ISO date)"
        }
      ]
    }
  ]
}
```

* 1.4 보상 수령
```
POST /events/reward-receive
```
- **설명**: 이벤트 보상을 수령합니다.
- **요청**:
```json
{
  "event_id": "string",
  "reward_id": "string"
}
```
- **응답**:
```json
{
  "status": 200,
  "message": "보상 수령 성공",
  "data": {
    "reward_id": "string",
    "name": "string",
    "type": "string (ITEM/COIN/ETC)",
    "amount": "number",
    "received_at": "string (ISO date)"
  }
}
```

##### 2. 관리자 API

* 2.1 이벤트 목록 조회 (관리자)
```
GET /events-admin
```
- **설명**: 관리자용 이벤트 목록을 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 목록 조회 성공",
  "data": [
    {
      "event_id": "string",
      "title": "string",
      "description": "string",
      "start_date": "string (ISO date)",
      "end_date": "string (ISO date)",
      "status": "string (ACTIVE/INACTIVE)",
      "created_at": "string (ISO date)",
      "updated_at": "string (ISO date)",
      "rewards": [
        {
          "reward_id": "string",
          "name": "string",
          "description": "string",
          "type": "string (ITEM/COIN/ETC)",
          "amount": "number"
        }
      ]
    }
  ]
}
```

* 2.2 이벤트 상세 조회 (관리자)
```
GET /events-admin/detail/:event_id
```
- **설명**: 관리자용 이벤트 상세 정보를 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 상세 조회 성공",
  "data": {
    "event_id": "string",
    "title": "string",
    "description": "string",
    "start_date": "string (ISO date)",
    "end_date": "string (ISO date)",
    "status": "string (ACTIVE/INACTIVE)",
    "created_at": "string (ISO date)",
    "updated_at": "string (ISO date)",
    "rewards": [
      {
        "reward_id": "string",
        "name": "string",
        "description": "string",
        "type": "string (ITEM/COIN/ETC)",
        "amount": "number"
      }
    ]
  }
}
```

* 2.3 이벤트 히스토리 조회 (관리자)
```
GET /events-admin/history/:event_id
```
- **설명**: 특정 이벤트의 참여자 히스토리를 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "이벤트 히스토리 조회 성공",
  "data": [
    {
      "user_id": "string",
      "username": "string",
      "participated_at": "string (ISO date)",
      "rewards_received": [
        {
          "reward_id": "string",
          "name": "string",
          "received_at": "string (ISO date)"
        }
      ]
    }
  ]
}
```

* 2.4 이벤트 생성 (관리자)
```
POST /events-admin
```
- **설명**: 새로운 이벤트를 생성합니다.
- **요청**:
```json
{
  "title": "string",
  "description": "string",
  "start_date": "string (ISO date)",
  "end_date": "string (ISO date)",
  "rewards": [
    {
      "name": "string",
      "description": "string",
      "type": "string (ITEM/COIN/ETC)",
      "amount": "number"
    }
  ]
}
```
- **응답**:
```json
{
  "status": 201,
  "message": "이벤트 생성 성공",
  "data": {
    "event_id": "string",
    "title": "string",
    "description": "string",
    "start_date": "string (ISO date)",
    "end_date": "string (ISO date)",
    "status": "ACTIVE",
    "created_at": "string (ISO date)",
    "updated_at": "string (ISO date)",
    "rewards": [
      {
        "reward_id": "string",
        "name": "string",
        "description": "string",
        "type": "string (ITEM/COIN/ETC)",
        "amount": "number"
      }
    ]
  }
}
```

### 2.5 보상 생성 (관리자)
```
POST /rewards-admin
```
- **설명**: 새로운 보상을 생성합니다.
- **요청**:
```json
{
  "name": "string",
  "description": "string",
  "type": "string (ITEM/COIN/ETC)",
  "amount": "number"
}
```
- **응답**:
```json
{
  "status": 201,
  "message": "보상 생성 성공",
  "data": {
    "reward_id": "string",
    "name": "string",
    "description": "string",
    "type": "string (ITEM/COIN/ETC)",
    "amount": "number",
    "created_at": "string (ISO date)",
    "updated_at": "string (ISO date)"
  }
}
```

* 2.6 보상 목록 조회 (관리자)
```
GET /rewards-admin
```
- **설명**: 생성된 보상 목록을 조회합니다.
- **응답**:
```json
{
  "status": 200,
  "message": "보상 목록 조회 성공",
  "data": [
    {
      "reward_id": "string",
      "name": "string",
      "description": "string",
      "type": "string (ITEM/COIN/ETC)",
      "amount": "number",
      "created_at": "string (ISO date)",
      "updated_at": "string (ISO date)"
    }
  ]
}
```

##### 3. 공통 응답 형식

* 3.1 성공 응답
```json
{
  "status": number,
  "message": "string",
  "data": object | array
}
```

* 3.2 에러 응답
```json
{
  "status": number,
  "message": "string",
  "error": {
    "code": "string",
    "details": "string"
  }
}
```

##### 공통 에러 코드
- `U001`: "알 수 없는 오류가 발생했습니다."
- `U002`: "세션이 만료되었습니다."
- `U003`: "유효하지 않은 세션입니다."
- `U004`: "권한이 없습니다."
- `B001`: "잘못된 요청입니다."
- `B002`: "요청하신 경로를 찾을 수 없습니다."
- `V001`: "올바르지 않은 값이 전달되었습니다."

##### Role Enum
```typescript
enum Role {
  USER = 'user',
  OPERATOR = 'operator',
  AUDITOR = 'auditor',
  ADMIN = 'admin'
}
```

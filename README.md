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
docker compose up --build

# 서비스 확인
Gateway: http://localhost:3000
혹은 docker desktop 어플에서 로그를 확인
```

#### 🧪 테스트 방법
* Curl 혹은 Postman(권장)
* 회원가입, 로그인시 response로 `jwt_token` 값을 전달합니다.\
  해당 값을 Authorization의 `Bearer Token`에 넣어야지 권한이 부여됩니다.

### 🧾 API 명세서
***

#### User

user_server의 API 명세서를 작성하기 위해 관련 파일들을 더 자세히 살펴보겠습니다.


Search files...
검색 결과를 바탕으로 user_server의 API 명세서를 작성하겠습니다.

# User Server API 명세서

## 1. 회원가입
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

## 2. 로그인
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
  - `U001`: "알 수 없는 오류가 발생했습니다."

## 3. 사용자 정보 조회
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
  - `U001`: "알 수 없는 오류가 발생했습니다."

## 4. 역할 변경
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
  - `U001`: "알 수 없는 오류가 발생했습니다."

## 공통 에러 코드
- `U001`: "알 수 없는 오류가 발생했습니다."
- `U002`: "세션이 만료되었습니다."
- `U003`: "유효하지 않은 세션입니다."
- `U004`: "권한이 없습니다."
- `B001`: "잘못된 요청입니다."
- `B002`: "요청하신 경로를 찾을 수 없습니다."

## Role Enum
```typescript
enum Role {
  USER = 'user',
  OPERATOR = 'operator',
  AUDITOR = 'auditor',
  ADMIN = 'admin'
}
```

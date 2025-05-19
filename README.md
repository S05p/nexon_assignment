### 📖 목차

1. [🔍 서버 Flow](#-서버-flow)
2. [✅ 준비 사항](#-준비-사항)
3. [🧾 API 명세서](#-api-명세서)

### 🔍 서버 Flow
***
![Image](https://github.com/user-attachments/assets/f204393f-bf35-48a6-874c-c58b6bd46595)

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

 

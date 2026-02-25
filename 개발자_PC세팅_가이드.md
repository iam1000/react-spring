# 👨‍💻 신규 개발자 PC 세팅 가이드 (React + Spring Boot)

이 문서는 완성된 프로젝트 소스를 `.zip` 파일로 전달받은 신규 또는 협업 개발자가 본인의 로컬 PC 환경을 빠르게 세팅하고 5분 안에 로컬 서버 통합 테스트를 통과하기 위한 **단계별(Step-by-Step) 가이드**입니다.

---

## 1. 사전 필수 프로그램 설치

프로젝트 소스를 열기 전, 개발 PC에 아래 프로그램들이 설치되어 있어야 합니다.

### 1) Node.js (프론트엔드 런타임)
*   [Node.js 공식 홈페이지](https://nodejs.org/ko/)에서 18.x 또는 20.x(LTS) 버전을 다운로드하여 기본값으로 설치합니다.
*   **확인:** 터미널에서 `node -v`, `npm -v` 명령어를 입력해 버전이 잘 뜨는지 확인합니다.

### 2) IDE (통합 개발 환경) 지정
*   본 프로젝트는 프론트와 백엔드 모두 **Antigravity**를 사용하여 개발하는 것을 기본 환경으로 권장하고 있습니다. (물론 백엔드는 IntelliJ 툴을 쓰셔도 무방합니다.)
*   **Antigravity 툴 세팅:** 
    *   Antigravity는 최신 AI 기반 Agentic 코딩 툴이므로 각종 복잡한 Extension 설치 없이, 워크스페이스를 지정하고 AI Agent와 채팅을 통해 코딩을 즉각 진행할 수 있습니다.

---

## 2. ☕ JDK 17 설치 및 환경 변수 설정 (핵심 🚨)

Spring Boot 3.x 코어를 사용하는 본 백엔드 소스는 **반드시 Java 17 버전 이상**이 필요합니다. 
기존 PC에 구버전(Java 8 등)이 메인으로 깔려있더라도 걱정하지 마시고 17버전을 병렬로 추가 설치해야 합니다.

### 2.1 Java 17 다운로드 및 실행

#### Windows 환경
아래 두 링크 중 하나를 선택해 `.msi` 설치 파일을 다운로드하고 실행합니다.
*   👉 **[Amazon Corretto 17 다운로드 (Windows x64)](https://corretto.aws/downloads/latest/amazon-corretto-17-x64-windows-jdk.msi)**
*   👉 [Eclipse Temurin 17 다운로드 (Windows x64)](https://api.adoptium.net/v3/installer/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk)

#### Mac 환경
Mac 환경에서는 패키지 관리자인 Homebrew를 이용한 설치를 가장 권장합니다. 터미널을 열고 아래 명령어를 순서대로 실행하세요.

1. Homebrew로 Eclipse Temurin 17 설치:
   ```bash
   brew install --cask temurin@17
   ```
2. `JAVA_HOME` 환경 변수 설정 (zsh 기준):
   ```bash
   echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
   source ~/.zshrc
   ```
3. 정상 세팅 확인:
   ```bash
   java -version
   echo $JAVA_HOME
   ```

### 2.2 설치 시 필수 클릭 주의사항 (환경 변수 자동 등록)
설치 화면(Custom Setup)으로 진입했을 때, **`Set JAVA_HOME environment variable`** 항목 옆의 아이콘이 `X(붉은 버튼)`로 막혀 있을 수 있습니다.
이 부분을 반드시 마우스로 클릭해서 **`Will be installed on local hard drive`** 로 변경해 주어야 합니다. 이렇게 하면 복잡한 시스템 환경 변수 세팅을 수동으로 잡을 필요 없이 윈도우가 알아서 세팅해 줍니다.

### 2.3 설치 갱신 확인
설치를 완전히 마치면 **기존에 열려있던 모든 터미널과 Antigravity 창을 완전히 종료했다가 다시 켭니다.** (환경변수 새로고침 목적) 
새 터미널 창을 열고 아래 명령어를 입력하여 결과가 나오는지 봅니다.
```bash
java -version
# 정상 출력 예시: openjdk version "17.0.x" ...
```

---

## 3. 📂 소스 코드 압축 해제 및 워크스페이스 열기

압축된 프로젝트 소스 파일(`.zip`)을 지정된 경로에 해제합니다.
프로젝트 내의 로컬 경로 설정이나 데몬 세팅이 아래 경로를 기준으로 하드코딩 되어 있으므로 가급적 **경로 스펠링을 동일하게 맞춰주시면 제일 안전**합니다.

1.  본인의 `C:\` 드라이브 최상단에 `AI_DEV` 폴더를 직접 만듭니다.
2.  전달받은 압축 파일을 해당 폴더 안에 풀어줍니다.
3.  최종적으로 아래와 같은 경로 트리가 되어야 합니다.
    👉 **`C:\AI_DEV\REACT_SPRING\`** 공간 안에 `frontend`, `backend` 등의 폴더가 보여야 함.
4.  Antigravity를 켜고 워크스페이스(Workspace) 경로를 **루트 폴더(`.zip` 푼 가장 바깥쪽의 REACT_SPRING 폴더)** 로 지정하여 프로젝트를 엽니다.

---

## 4. 🌐 프론트엔드(React) 설치 및 렌더링 서버 구동

1.  Antigravity 내부 터미널(또는 외부 터미널)을 열고 프론트엔드 폴더로 포커스를 이동합니다.
    ```bash
    cd frontend
    ```
2.  로컬 PC에 필요한 라이브러리(`node_modules`)를 한 번에 자동 다운로드합니다. 이 명령은 최초 세팅 시 1회만 수행하면 됩니다.
    ```bash
    npm install
    # 패키지 버전 충돌 시: npm install --legacy-peer-deps
    ```
3.  설치 바가 끝나면, 개발 서버를 기동합니다.
    ```bash
    npm run dev
    ```
4.  잠시 후 터미널에 `http://localhost:5173` 초록색 링크가 나타나면 프론트엔드 가동 대기 성공입니다. (이 터미널 탭은 닫지 말고 켜둡니다.)

---

## 5. ⚙️ 백엔드(Spring Boot) 서버 기동 및 DB 자동 연결

1.  터미널 창에서 새로운 탭 또는 세션을 하나 더 엽니다.
2.  백엔드 폴더로 포커스를 이동합니다.
    ```bash
    cd backend
    ```
3.  아래의 컴파일 및 실행 명령어를 입력하여 WAS 서버를 구동시킵니다.
    *   **Window 환경:** `.\gradlew.bat bootRun`
    *   (Mac/Ubuntu 환경: `./gradlew bootRun`)
4.  콘솔에 Spring 로고가 뜨면서 로딩되다가 맨 밑에 `Started BackendApplication in X seconds` 메세지가 보이면, 백엔드 로컬 서버가 `8080` 포트로 완벽하게 실행된 것입니다. 
    *참고: DB 커넥션 등 코어 셋팅값은 클라우드 Supabase DB를 바라보도록 공유된 yml 파일 내 정보로 알아서 연결 처리됩니다.*

---

## 6. 🎉 연동 최종 테스트 (Sanity Check)

양쪽 서버(Vite, Spring Boot)가 모두 켜져 있는 상태에서 웹 브라우저 주소창에 아래 링크를 입력해 접속합니다.
👉 **[http://localhost:5173](http://localhost:5173)**

1~2초 가량 스피너가 돌다가 화면 정중앙에 아래 내용이 렌더링되면 100% 준비 완료입니다.
*   **"Spring Boot와 React 연동이 완벽하게 성공했습니다! 🎉"** 
*   **"(DB 상태: Supabase 클라우드 데이터베이스 정상 구동 중)"** 

수고하셨습니다! 이제 프론트/백엔드 로컬 개발 업무에 즉각 투입되시면 됩니다.

---

## 🚨 트러블슈팅 (에러가 발생했을 때 대처법)

아래는 각자 다른 PC 환경 때문에 빈번히 발생하는 오류들과 원인, 그리고 해결책입니다.

### Q1. 백엔드 빌드할 때 'Gradle requires JVM 17 or later to run. Your build is currently configured to use JVM 8.' 등 에러가 나면서 붉은 밑줄이 수십 개 뜹니다!
*   **원인:** PC 윈도우 환경 변수의 시스템 우선순위 때문에 방금 설치한 17버전이 아닌 과거의 Java 8버전을 데몬(Daemon)이 물어버리면서 컴파일 구문 에러가 나는 것입니다.
*   **해결책:** 
    1. Antigravity의 대화창(Prompt)을 엽니다.
    2. 메세지로 *"백엔드 버전이 자바 8로 컴파일되고 있는데, Java 17을 바라보게끔 설정 파일과 환경 변수를 전부 갱신해줘"* 라고 대화합니다.
    3. 똑똑한 AI Agent가 상황을 파악하여 `gradle.properties`나 구성 파일을 자동으로 조작하여 17버전 락킹을 수행하고 문제를 해결해줍니다!

### Q2. 프론트엔드 터미널에서 `npm install` 과정 중 붉은색 글씨로 Error: ENOENT 또는 node-gyp 관련된 오류가 장황하게 쏟아집니다.
*   **원인:** 과거 진행했던 다른 프로젝트의 NPM 캐시가 꼬였거나, 다운로드 도중 네트워크 끊김으로 인해 잔여 폴더 찌꺼기가 생성되었을 때 발생합니다.
*   **해결책:** 기존 캐시 폴더를 강제로 비우고 새로 깔아주면 즉시 해결됩니다.
    ```bash
    npm cache clean --force
    # 이후 윈도우 파일탐색기로 \frontend 폴더 내의 node_modules 폴더와 package-lock.json 파일을 직접 우클릭->삭제 합니다.
    # 다시 npm install 수행
    npm install
    ```

### Q3. 백엔드 `bootRun` 과정에서 데이터베이스 커넥션 에러(5432 Port Closed)가 뜹니다.
*   **해결책:** 본 프로젝트의 DB는 클라우드 Supabase를 타겟팅하고 있으나, 회사 내부 네트워크 방화벽에서 외부 DB 접근 포트인 `5432`를 차단했을 가능성이 높습니다. 와이파이 망을 변경하시거나 백엔드 매니저에게 방화벽 해지 요청을 해주세요.

# 🚗 자동차 사고 다발 지역 조회 시스템

인천 지역의 교통사고 데이터를 시각화하여 사고 다발 지역과 유형별 통계를 제공하는 웹 애플리케이션입니다.

## 📋 프로젝트 소개

이 프로젝트는 공공데이터 포털의 교통사고 정보를 활용하여 사용자가 지역별, 사고유형별 통계를 한눈에 파악할 수 있도록 도와주는 시스템입니다.

### 🎓 프로젝트 배경

이 프로젝트는 코리아IT아카데미학원에서 프론트엔드 개발자 과정 수료하며 진행한 그룹 프로젝트\*\*입니다.

-   **역할**: 프로젝트 조장으로 팀을 리드하며 전체 일정 관리 및 기능 구현을 주도했습니다.
-   **개발 환경**: 당시에는 Git/GitHub을 활용한 협업 방식을 도입하지 않고 개발을 진행했으며, 이후 개인적으로 GitHub에 코드를 업로드하여 관리하고 있습니다.
-   **학습 목표**: React 기반의 SPA 개발, 공공 API 활용, 데이터 시각화 라이브러리 사용 경험 습득

이 프로젝트를 통해 프론트엔드 개발의 전반적인 프로세스를 경험하고, 팀 프로젝트 리더로서의 역량을 키울 수 있었습니다.

### 주요 기능

-   📊 **차트 분석**: 사고 유형별 사망자, 부상자, 중상자 수 통계를 막대 그래프로 표시
-   🗺️ **지도 시각화**: 카카오 맵을 활용한 사고 발생 위치 마커 표시
-   📄 **상세 정보**: 선택한 지역의 사고 데이터를 테이블로 상세 조회
-   🔍 **필터링**: 시/도, 시군구, 사고유형별 데이터 필터링

### 사고 유형

-   횡단중
-   추돌
-   측면충돌
-   공작물충돌
-   기타

## 🛠️ 기술 스택

### Frontend

-   **React** 18.2.0
-   **JavaScript (ES6+)**

### UI 라이브러리

-   **Semantic UI React** 2.1.3
-   **Material-UI** 5.10.14
-   **Semantic UI CSS** 2.5.0

### 데이터 시각화

-   **Recharts** 2.1.16 - 차트 라이브러리
-   **React Kakao Maps SDK** 1.1.5 - 지도 API

### HTTP 클라이언트

-   **Axios** 1.1.3

### 기타

-   **uuid** - 고유 키 생성

## 📦 설치 방법

### 1. 저장소 클론

```bash
git clone https://github.com/bangmim/projectIT.git
cd projectIT/group-project
```

### 2. 의존성 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택사항)

공공데이터 API를 사용하는 경우 `.env` 파일을 생성하고 서비스 키를 설정하세요.

```
REACT_APP_SERVICE_KEY=your_service_key_here
```

### 4. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000/projectIT](http://localhost:3000/projectIT)로 접속합니다.

## 🚀 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### GitHub Pages 배포

```bash
npm run deploy
```

배포된 사이트: [https://bangmim.github.io/projectIT](https://bangmim.github.io/projectIT)

## 📖 사용 방법

1. **지역 선택**: 상단 드롭다운에서 "인천"을 선택합니다.
2. **시군구 선택**: 원하는 시군구(예: 중구, 부평구 등)를 선택합니다.
3. **사고유형 선택**: 조회하고 싶은 사고 유형을 선택합니다.
4. **탭 전환**:
    - **차트 탭** 📊: 사고 유형별 통계를 막대 그래프로 확인
    - **지도 탭** 🗺️: 사고 발생 위치를 지도에서 확인
    - **상세정보 탭** 📄: 데이터를 테이블 형식으로 확인

## 🔧 스크립트 명령어

| 명령어           | 설명                            |
| ---------------- | ------------------------------- |
| `npm start`      | 개발 서버 실행 (localhost:3000) |
| `npm run build`  | 프로덕션 빌드 생성              |
| `npm test`       | 테스트 실행                     |
| `npm run deploy` | GitHub Pages에 배포             |

## 📂 프로젝트 구조

```
group-project/
├── public/
│   ├── index.html          # 메인 HTML (카카오 맵 API 로드)
│   └── search.ico          # 파비콘
├── src/
│   ├── App.js              # 메인 컴포넌트
│   ├── App.css             # 스타일시트
│   ├── index.js            # 진입점
│   └── ...
├── package.json            # 프로젝트 설정 및 의존성
└── README.md               # 프로젝트 문서
```

## 🔑 API 정보

### 공공데이터 포털 API

-   **데이터셋**: 교통사고 정보
-   **제공기관**: 공공데이터포털
-   **API 엔드포인트**: `https://api.odcloud.kr/api/15070340/v1/uddi:4682264b-e754-4aa9-a0d7-b3dcd0f746b7`

### 카카오 맵 API

-   **개발자 콘솔**: [https://developers.kakao.com](https://developers.kakao.com)
-   **도메인 설정**: GitHub Pages 도메인 등록 필요

## ⚠️ 문제 해결

### 지도가 보이지 않는 경우

1. 카카오 개발자 콘솔에서 웹 플랫폼에 도메인이 등록되어 있는지 확인
2. `public/index.html`에서 카카오 맵 API 스크립트가 `https://`로 로드되는지 확인

### 차트가 보이지 않는 경우

-   상단에서 **지역 → 시군구 → 사고유형**을 순서대로 선택했는지 확인

### npm start 실행 오류

```bash
# 정확한 디렉토리에 있는지 확인
cd /Users/mihyunpark/Desktop/projectIT/group-project

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 서버 실행
npm start
```

## 🤝 기여

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이센스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 👥 제작자

-   GitHub: [@bangmim](https://github.com/bangmim)

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ using React**

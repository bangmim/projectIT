# 🚗 자동차 사고 다발 지역 조회 시스템

인천 지역의 교통사고 데이터를 시각화하여 사고 다발 지역과 유형별 통계를 제공하는 웹 애플리케이션입니다.

**배포된 사이트**: [https://bangmim.github.io/projectIT](https://bangmim.github.io/projectIT)

## 📋 프로젝트 소개

이 프로젝트는 공공데이터 포털의 교통사고 정보를 활용하여 사용자가 지역별, 사고유형별 통계를 한눈에 파악할 수 있도록 도와주는 시스템입니다.

### 주요 기능

-   📊 **차트 분석**: 사고 유형별 (횡단중, 추돌, 측면충돌, 공작물충돌, 기타) 사망자, 부상자, 중상자 수 통계 시각화
-   🗺️ **지도 시각화**: 카카오 맵을 활용한 사고 발생 위치 마커 표시
-   📄 **상세 정보**: 선택한 지역의 사고 데이터를 테이블로 상세 조회
-   🔍 **필터링**: 시/도, 시군구, 사고유형별 데이터 필터링

## 🛠️ 기술 스택

-   **React** 18.2.0
-   **TypeScript** 4.9.3
-   **Recharts** - 차트 라이브러리
-   **React Kakao Maps SDK** - 지도 시각화

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/bangmim/projectIT.git
cd projectIT/group-project

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## 📖 사용 방법

1. 지역 선택 (인천) → 시군구 선택 → 사고유형 선택
2. 탭 전환으로 **차트**, **지도**, **상세정보** 확인

---

## 🎓 프로젝트 배경

이 프로젝트는 코리아IT아카데미학원에서 프론트엔드 개발자 과정 수료하며 진행한 그룹 프로젝트입니다.

-   **역할**: 프로젝트 조장으로 팀을 리드하며 전체 일정 관리 및 기능 구현을 주도했습니다.
-   **개발 환경**: 당시에는 Git/GitHub을 활용한 협업 방식을 도입하지 않고 개발을 진행했으며, 이후 개인적으로 GitHub에 코드를 업로드하여 관리하고 있습니다.
-   **학습 목표**: React 기반의 SPA 개발, 공공 API 활용, 데이터 시각화 라이브러리 사용 경험 습득

이 프로젝트를 통해 프론트엔드 개발의 전반적인 프로세스를 경험하고, 팀 프로젝트 리더로서의 역량을 키울 수 있었습니다.

## 🔄 코드 리팩토링 (2025.10.22)

프로젝트 완성 후 코드 품질 향상을 위해 전면적인 리팩토링을 진행했습니다.

> 💡 **원본 코드 보기**: 리팩토링 전 JavaScript 버전은 [main 브랜치](../../tree/main)에서 확인할 수 있습니다.

### 1. TypeScript 마이그레이션

**배경**: JavaScript로 작성된 1000+ 줄의 코드를 TypeScript로 전환  
**효과**: 타입 안정성 확보, 컴파일 시점 에러 감지, IDE 자동완성 개선  
**작업 내용**:

-   타입 정의 파일 분리 (`types.ts`)
-   API 응답, 컴포넌트 Props, 이벤트 핸들러 타입 명시
-   위도/경도 데이터 타입 변환 로직 추가

### 2. 컴포넌트 구조 개선

**배경**: 1000+ 줄의 App.tsx가 유지보수 어려움  
**효과**: 가독성 향상, 재사용성 증가, 관심사 분리  
**작업 내용**:

-   `AccidentChart.tsx` - 차트 시각화 로직 분리 (85줄)
-   `AccidentMap.tsx` - 지도 마커 표시 로직 분리, 아이콘 상수화 (101줄)
-   `AccidentTable.tsx` - 테이블 렌더링 로직 분리, 재사용 컴포넌트화 (72줄)
-   `App.tsx` - 상태 관리와 UI 레이아웃만 담당 (212줄)

### 3. 변수명 개선

**배경**: 한글 변수명과 불분명한 이름(data1, data2, data3)으로 인한 코드 이해 어려움  
**효과**: 코드의 의도를 명확히 전달, 국제 표준 준수  
**주요 변경**:

-   Props: `data1, data2, data3` → `selectedCity, selectedDistrict, accidentType`
-   데이터 필터: `선택, 선택1` → `incheonData, filteredByDistrict`
-   핸들러: `handleSelect, handlerest` → `handleCitySelect, handleReset`
-   리스트: `selectList, selectGu` → `cityList, districtList`
-   통계: `횡단중사망자` → `crossingDeaths`

### 4. 코드 최적화

-   사용하지 않는 import 10개 이상 제거
-   반복되는 filter/map 로직을 헬퍼 함수로 통합 (`getAccidentsByType`, `convertToMarkerData`)
-   매직 넘버/문자열을 상수로 추출 (`ACCIDENT_ICONS`, `INCHEON_CENTER`)
-   카카오 맵 API 프로토콜을 https://로 명시

**최종 결과**:

-   코드 라인: 1078줄 → 494줄 (54% 감소)
-   파일 구조: 단일 파일 → 5개 모듈 (관심사 분리)
-   에러/경고: 0개
-   유지보수성: 대폭 향상

---

**Made with ❤️ using React & TypeScript**

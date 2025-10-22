// 교통사고 데이터 타입 정의
export interface AccidentItem {
    발생지시도: string;
    발생지시군구: string;
    사고유형: string;
    사망자수: number;
    부상자수: number;
    중상자수: number;
    위도: string | number;
    경도: string | number;
    [key: string]: any;
}

export interface ApiResponse {
    data: AccidentItem[];
}

export interface AccidentComponentProps {
    data: ApiResponse;
    selectedCity: string;
    selectedDistrict: string | null;
    accidentType: string | null | AccidentItem[];
}

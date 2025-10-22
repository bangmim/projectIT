import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { AccidentComponentProps, AccidentItem } from '../types';

interface MarkerPosition {
    title: string;
    latlng: {
        lat: number;
        lng: number;
    };
}

const ACCIDENT_ICONS = {
    횡단중: 'https://cdn-icons-png.flaticon.com/512/98/98145.png',
    공작물충돌:
        'https://img.icons8.com/external-outline-chattapat-/512/external-accident-car-accident-outline-chattapat--4.png',
    추돌: 'https://img.icons8.com/external-others-bomsymbols-/512/external-accident-car-others-bomsymbols--2.png',
    측면충돌: 'https://img.icons8.com/ios-filled/512/car-crash.png',
    기타: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
};

const INCHEON_CENTER = {
    lat: 37.47928504819,
    lng: 126.64224189279,
};

export function AccidentMap({ data, selectedCity, selectedDistrict }: AccidentComponentProps): JSX.Element | null {
    if (!selectedCity || !selectedDistrict) {
        return null;
    }

    const incheonData = data.data.filter((item) => item['발생지시도'] === '인천');
    const filteredByDistrict = incheonData.filter((item) => item['발생지시군구'] === selectedDistrict);

    const convertToMarkerData = (items: AccidentItem[]): MarkerPosition[] => {
        return items.map((item) => ({
            title: item['사고유형'],
            latlng: {
                lat: Number(item['위도']),
                lng: Number(item['경도']),
            },
        }));
    };

    const getAccidentsByType = (type: string) => {
        return filteredByDistrict.filter((item) => item['사고유형'] === type);
    };

    const allAccidents = convertToMarkerData(filteredByDistrict);

    const getMarkerIcon = (type: string) => {
        const iconUrl = ACCIDENT_ICONS[type as keyof typeof ACCIDENT_ICONS] || ACCIDENT_ICONS['기타'];
        return {
            src: iconUrl,
            size: { width: 35, height: 35 },
        };
    };

    return (
        <div style={{ width: '100%', height: '80%', padding: '0 4rem 4rem 4rem' }}>
            <h3>전체사고지역</h3>
            <Map center={INCHEON_CENTER} style={{ width: '100%', height: '100%' }} level={9}>
                {allAccidents.map((position, index) => (
                    <MapMarker
                        key={`${position.title}-${index}`}
                        position={position.latlng}
                        image={getMarkerIcon(position.title)}
                        title={position.title}
                    />
                ))}
            </Map>

            {/* 사고 유형별 지도 */}
            {Object.keys(ACCIDENT_ICONS).map((accidentType) => {
                const accidents = getAccidentsByType(accidentType);
                const markers = convertToMarkerData(accidents);

                if (markers.length === 0) return null;

                return (
                    <div key={accidentType} style={{ marginTop: '2rem' }}>
                        <h3>{accidentType}사고지역</h3>
                        <Map center={INCHEON_CENTER} style={{ width: '100%', height: '500px' }} level={9}>
                            {markers.map((position, index) => (
                                <MapMarker
                                    key={`${accidentType}-${index}`}
                                    position={position.latlng}
                                    image={getMarkerIcon(accidentType)}
                                    title={position.title}
                                />
                            ))}
                        </Map>
                    </div>
                );
            })}
            <br />
            <br />
        </div>
    );
}

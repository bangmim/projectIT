import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AccidentComponentProps } from '../types';

export function AccidentChart({ data, selectedCity, selectedDistrict }: AccidentComponentProps) {
    const incheonData = data.data.filter((item) => item['발생지시도'] === '인천');
    const filteredByDistrict = incheonData.filter((item) => item['발생지시군구'] === selectedDistrict);

    // 사고 유형별 통계 계산
    const getAccidentStatsByType = (accidentType: string) => {
        return filteredByDistrict.filter((item) => item['사고유형'] === accidentType);
    };

    const getOtherAccidents = () => {
        const mainTypes = ['공작물충돌', '추돌', '측면충돌', '횡단중'];
        return filteredByDistrict.filter(
            (item) => item['발생지시도'] === '인천' && !mainTypes.includes(item['사고유형'])
        );
    };

    const crossing = getAccidentStatsByType('횡단중');
    const sideCollision = getAccidentStatsByType('측면충돌');
    const rearEnd = getAccidentStatsByType('추돌');
    const structureCollision = getAccidentStatsByType('공작물충돌');
    const other = getOtherAccidents();

    const chartData = [
        {
            name: '횡단중',
            중상자수: crossing.filter((item) => item['중상자수']).length,
            부상자수: crossing.filter((item) => item['부상자수']).length,
            사망자수: crossing.filter((item) => item['사망자수']).length,
        },
        {
            name: '측면충돌',
            중상자수: sideCollision.filter((item) => item['중상자수']).length,
            부상자수: sideCollision.filter((item) => item['부상자수']).length,
            사망자수: sideCollision.filter((item) => item['사망자수']).length,
        },
        {
            name: '추돌',
            중상자수: rearEnd.filter((item) => item['중상자수']).length,
            부상자수: rearEnd.filter((item) => item['부상자수']).length,
            사망자수: rearEnd.filter((item) => item['사망자수']).length,
        },
        {
            name: '공작물충돌',
            중상자수: structureCollision.filter((item) => item['중상자수']).length,
            부상자수: structureCollision.filter((item) => item['부상자수']).length,
            사망자수: structureCollision.filter((item) => item['사망자수']).length,
        },
        {
            name: '기타',
            중상자수: other.filter((item) => item['중상자수']).length,
            부상자수: other.filter((item) => item['부상자수']).length,
            사망자수: other.filter((item) => item['사망자수']).length,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="부상자수" stackId="a" fill="#FFCDD2" />
                <Bar dataKey="중상자수" stackId="a" fill="#E57373" />
                <Bar dataKey="사망자수" stackId="a" fill="#F44336" />
            </BarChart>
        </ResponsiveContainer>
    );
}

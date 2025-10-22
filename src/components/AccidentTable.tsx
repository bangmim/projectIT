import React from 'react';
import { AccidentComponentProps, AccidentItem } from '../types';

export function AccidentTable({ data, selectedCity, selectedDistrict }: AccidentComponentProps) {
    const incheonData = data.data.filter((item) => item['발생지시도'] === '인천');
    const filteredByDistrict = incheonData.filter((item) => item['발생지시군구'] === selectedDistrict);

    const getAccidentsByType = (type: string) => {
        return filteredByDistrict.filter((item) => item['사고유형'] === type);
    };

    const getOtherAccidents = () => {
        const mainTypes = ['공작물충돌', '추돌', '측면충돌', '횡단중'];
        return filteredByDistrict.filter(
            (item) => item['발생지시도'] === '인천' && !mainTypes.includes(item['사고유형'])
        );
    };

    const crossing = getAccidentsByType('횡단중');
    const sideCollision = getAccidentsByType('측면충돌');
    const rearEnd = getAccidentsByType('추돌');
    const structureCollision = getAccidentsByType('공작물충돌');
    const other = getOtherAccidents();

    const TableColumn = ({ items, field }: { items: AccidentItem[]; field: string }) => (
        <td>
            {items.map((item, index) => (
                <p key={index}>{item[field]}</p>
            ))}
        </td>
    );

    const AccidentTypeRow = ({ accidents }: { accidents: AccidentItem[] }) => (
        <tr>
            <TableColumn items={accidents} field="발생지시도" />
            <TableColumn items={accidents} field="발생지시군구" />
            <TableColumn items={accidents} field="사고유형" />
            <TableColumn items={accidents} field="발생년월일시" />
            <TableColumn items={accidents} field="가해자법규위반" />
            <TableColumn items={accidents} field="부상자수" />
            <TableColumn items={accidents} field="중상자수" />
            <TableColumn items={accidents} field="사망자수" />
        </tr>
    );

    return (
        <div style={{ overflow: 'scroll', margin: '0 auto' }}>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '8%' }}>지역</th>
                        <th style={{ width: '10%' }}>시군구</th>
                        <th>사고유형</th>
                        <th>발생년월일시</th>
                        <th>가해자법규위반</th>
                        <th style={{ width: '10%' }}>부상자수</th>
                        <th style={{ width: '10%' }}>중상자수</th>
                        <th style={{ width: '10%' }}>사망자수</th>
                    </tr>
                </thead>
                <tbody>
                    <AccidentTypeRow accidents={crossing} />
                    <AccidentTypeRow accidents={sideCollision} />
                    <AccidentTypeRow accidents={rearEnd} />
                    <AccidentTypeRow accidents={structureCollision} />
                    <AccidentTypeRow accidents={other} />
                </tbody>
            </table>
        </div>
    );
}

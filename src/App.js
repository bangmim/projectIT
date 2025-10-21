import React, { useState, useContext, useEffect, useRef, PureComponent, Component } from 'react';
import {
    Tab,
    Button,
    Divider,
    Image,
    Transition,
    Icon,
    Segment,
    List,
    TableBody,
    Table,
    Modal,
} from 'semantic-ui-react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './App.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
    PieChart,
    Pie,
    Sector,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function fetchData(searchYearCd) {
    const serviceKey = process.env.REACT_APP_SERVICE_KEY;
    // console.log(process.env.REACT_APP_SERVICE_KEY);

    // const url = `https://api.odcloud.kr/api/15077586/v1/centers?page=${searchYearCd}&perPage=10&serviceKey=WV%2BGaslOLZJ8Ahm2kJuzpwbLG4izxcgItghQ8%2BvgcZq0YVEyrRvzdfxly8lq1xs%2FP83%2FZlpgpCXFDD2Rjz8Lmw%3D%3D&siDo=11&guGun=110&type=json&numOfRows=10&pageNo=1`;

    const url = `https://api.odcloud.kr/api/15070340/v1/uddi:4682264b-e754-4aa9-a0d7-b3dcd0f746b7?page=${searchYearCd}&perPage=3000&serviceKey=%2BeKIiP9KuILfRQMYW6mwid1FuD6OBJvjLh02%2FwqpUdnFfeK6KePliqFYtnqxnSQALgi0pHrlQPK6XD%2BXh2tfyg%3D%3D`;

    const promise = fetch(url).then((res) => {
        if (!res.ok) {
            throw res;
        }
        return res.json();
    });

    return promise;
}

export default App;

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [searchYearCd, setSearchYearCd] = useState(1);
    const [selectedcity, setSelectedCity] = useState('');
    const [selectedgu, setSelectedGu] = useState(null);
    const [selectedSago, setSelectedSago] = useState(null);
    const [state, setState] = useState({ visible: false });

    console.log(data);

    useEffect(() => {
        // setIsLoaded(false);

        fetchData(searchYearCd)
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            })
            .finally(() => setIsLoaded(true));
    }, [searchYearCd]);

    if (error) {
        return <p>failed to fetch</p>;
    }
    if (!isLoaded) {
        return <p>fetching data...</p>;
    }

    const toggleVisibility = () => setState((prevState) => ({ visible: !prevState.visible }));

    const { visible } = state;

    const panes = [
        {
            menuItem: (
                <Button animated="vertical" size="large" color="black">
                    <Button.Content hidden>차트</Button.Content>
                    <Button.Content visible>
                        <Icon name="chart bar " />
                    </Button.Content>
                </Button>
            ),
            render: () => (
                <div className="Table-back">
                    <Tab.Pane attached={false}>
                        <Rechart data={data} data1={selectedcity} data2={selectedgu} data3={selectedSago} />{' '}
                    </Tab.Pane>
                </div>
            ),
        },
        {
            menuItem: (
                <Button animated="vertical" size="large" color="blue">
                    <Button.Content hidden>지도</Button.Content>
                    <Button.Content visible>
                        <Icon name="map marker alternate" />
                    </Button.Content>
                </Button>
            ),
            render: () => (
                <div className="Table-Map">
                    <Tab.Pane attached={false}>
                        <KakaoMap data={data} data1={selectedcity} data2={selectedgu} data3={selectSago} />
                    </Tab.Pane>
                </div>
            ),
        },
        {
            menuItem: (
                <Button animated="vertical" size="large" color="yellow">
                    <Button.Content hidden>상세정보</Button.Content>
                    <Button.Content visible>
                        <Icon name="question circle outline" />
                    </Button.Content>
                </Button>
            ),
            render: () => (
                <div className="Table-back">
                    <Tab.Pane attached={false}>
                        <TTable data={data} data1={selectedcity} data2={selectedgu} data3={selectSago} />
                    </Tab.Pane>
                </div>
            ),
        },
    ];

    const selectList = data.data.map((item) => {
        if (item['발생지시도'] === '인천') {
            return item['발생지시도'];
        }
    });

    const handleSelect = (e) => {
        setSelectedCity(e.target.value);
    };

    const handlerest = (e) => {
        setSelectedCity('');
        setSelectedGu('');
        setState((prevState) => ({ visible: !prevState.visible }));
    };

    // console.log(selectList)

    const selectGu = data.data
        .filter((item) => selectedcity === item['발생지시도'])
        .map((item) => item['발생지시군구']);
    // console.log(selectGu)

    const handleSelect2 = (e) => {
        setSelectedGu(e.target.value);
    };

    const selectSago = data.data.filter((item) => selectedgu === item['발생지시군구']).map((item) => item);

    console.log(selectSago);

    //횡단중, 측면충돌, 추돌, 공작물충돌, 기타
    const 횡단중 = selectSago.filter((item) => {
        if (item['사고유형'] === '횡단중' && item['발생지시도'] === '인천') {
            return item;
        }
    });

    const 측면충돌 = selectSago.filter((item) => {
        if (item['사고유형'] === '측면충돌' && item['발생지시도'] === '인천') {
            return item;
        }
    });
    const 추돌 = selectSago.filter((item) => {
        if (item['사고유형'] === '추돌' && item['발생지시도'] === '인천') {
            return item;
        }
    });
    const 공작물충돌 = selectSago.filter((item) => {
        if (item['사고유형'] === '공작물충돌' && item['발생지시도'] === '인천') {
            return item;
        }
    });

    const 기타 = selectSago.filter((item) => {
        if (item['발생지시도'] === '인천' && item['사고유형'] === '기타') {
            return item;
        }
    });
    // console.log(횡단중)
    // console.log(측면충돌)
    // console.log(추돌)
    // console.log(공작물충돌)
    // console.log(기타)

    // console.log(selectSago)

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <Divider hidden />
                <h1>&#128664; 자동차 &#128664;</h1>
                <h1>사고 다발 지역 조회</h1>

                <div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="지역-selectl">지역</InputLabel>
                            <Select onChange={handleSelect} value={selectedcity || ''}>
                                {[...new Set(selectList)].map((item) => (
                                    <MenuItem value={item || ''} key={uuidv4()}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="구-selectl">시 군 구</InputLabel>
                            <Select onChange={handleSelect2} value={selectedgu || ''}>
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                {[...new Set(selectGu)].map((item) => (
                                    <MenuItem value={item || ''} key={uuidv4()}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <button
                            className="ui animated button"
                            onClick={toggleVisibility}
                            style={{
                                borderRadius: '50%',
                                height: '30px',
                                width: '30px',
                                marginTop: '20px',
                                backgroundColor: 'black',
                            }}
                        >
                            <div className="visible content"></div>
                            <div className="hidden content">
                                <i
                                    aria-hidden="true"
                                    className="search icon"
                                    style={{ paddingLeft: '4px', color: 'white' }}
                                ></i>
                            </div>
                        </button>
                    </Box>
                    <Divider hidden />
                    <div className="flex">
                        <Transition visible={visible} animaiton="drop" duration={800}>
                            <Button
                                className="ui icon button fade visible transition"
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={handlerest}
                                size="big"
                            >
                                <Icon name="close" />
                            </Button>
                        </Transition>
                    </div>
                    <Transition visible={visible} animation="drop" duration={800}>
                        <Tab style={{ justifycontent: 'center' }} menu={{ secondary: true }} panes={panes} />
                    </Transition>
                </div>
            </div>
        </div>
    );
}

function Rechart({ data, data1, data2, data3 }) {
    // if (!data1 || !data2 || !data3) {
    //     return;
    // }

    // const selectList = data.data.map(item => data1 === item["발생지시도"]).map(item=>item)

    const 선택 = data.data.filter((item) => {
        if (item['발생지시도'] === '인천') {
            return item;
        }
    });
    // console.log(선택)

    const 선택1 = 선택.filter((item) => {
        //내가 선택한 데이터 값과 일치할 수 있도록 조건
        if (item['발생지시군구'] === data2) {
            return 1;
        }
    });
    // console.log(선택1)

    const 횡단중사망자 = 선택1.filter((item) => {
        if (item['사고유형'] === '횡단중') {
            return item['사망자수'];
        }
    });
    const 횡단중부상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '횡단중') {
            return item['부상자수'];
        }
    });
    const 횡단중중상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '횡단중') {
            return item['중상자수'];
        }
    });

    const 측면충돌사망자 = 선택1.filter((item) => {
        if (item['사고유형'] === '측면충돌') {
            return item['사망자수'];
        }
    });
    const 측면충돌부상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '측면충돌') {
            return item['부상자수'];
        }
    });
    const 측면충돌중상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '측면충돌') {
            return item['중상자수'];
        }
    });

    const 추돌사망자 = 선택1.filter((item) => {
        if (item['사고유형'] === '추돌') {
            return item['사망자수'];
        }
    });
    const 추돌부상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '추돌') {
            return item['부상자수'];
        }
    });
    const 추돌중상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '추돌') {
            return item['중상자수'];
        }
    });

    const 공작물충돌사망자 = 선택1.filter((item) => {
        if (item['사고유형'] === '공작물충돌') {
            return item['사망자수'];
        }
    });
    const 공작물충돌부상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '공작물충돌') {
            return item['부상자수'];
        }
    });
    const 공작물충돌중상자 = 선택1.filter((item) => {
        if (item['사고유형'] === '공작물충돌') {
            return item['중상자수'];
        }
    });

    const 기타사망자 = 선택1.filter((item) => {
        if (
            item['발생지시도'] === '인천' &&
            !(item['사고유형'] === '공작물충돌') &&
            !(item['사고유형'] === '추돌') &&
            !(item['사고유형'] === '측면충돌') &&
            !(item['사고유형'] === '횡단중')
        ) {
            return item['사망자수'];
        }
    });
    const 기타부상자 = 선택1.filter((item) => {
        if (
            item['발생지시도'] === '인천' &&
            !(item['사고유형'] === '공작물충돌') &&
            !(item['사고유형'] === '추돌') &&
            !(item['사고유형'] === '측면충돌') &&
            !(item['사고유형'] === '횡단중')
        ) {
            return item['부상자수'];
        }
    });
    const 기타중상자 = 선택1.filter((item) => {
        if (
            item['발생지시도'] === '인천' &&
            !(item['사고유형'] === '공작물충돌') &&
            !(item['사고유형'] === '추돌') &&
            !(item['사고유형'] === '측면충돌') &&
            !(item['사고유형'] === '횡단중')
        ) {
            return item['중상자수'];
        }
    });

    const data5 = [
        {
            name: '횡단중',
            중상자수: 횡단중중상자.length,
            부상자수: 횡단중부상자.length,
            사망자수: 횡단중사망자.length,
        },
        {
            name: '측면충돌',
            중상자수: 측면충돌중상자.length,
            부상자수: 측면충돌부상자.length,
            사망자수: 측면충돌사망자.length,
        },
        {
            name: '추돌',
            중상자수: 추돌중상자.length,
            부상자수: 추돌부상자.length,
            사망자수: 추돌사망자.length,
        },
        {
            name: '공작물충돌',
            중상자수: 공작물충돌중상자.length,
            부상자수: 공작물충돌부상자.length,
            사망자수: 공작물충돌사망자.length,
        },
        {
            name: '기타',
            중상자수: 기타중상자.length,
            부상자수: 기타부상자.length,
            사망자수: 기타사망자.length,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data5}
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
                {/* <Bar dataKey="name" stackId="c" fill="#ffc658" />
        <Bar dataKey="name" stackId="d" fill="#ff4682B4" />
        <Bar dataKey="name" stackId="e" fill="#e5e7eb" /> */}
            </BarChart>
        </ResponsiveContainer>
    );
}

function KakaoMap({ data, data1, data2, data3 }) {
    if (!data1 || !data2 || !data3) {
        return;
    }

    const 선택 = data.data.filter((item) => {
        if (item['발생지시도'] === '인천') {
            return item;
        }
    });
    // console.log(선택)

    const 선택1 = 선택.filter((item) => {
        //내가 선택한 데이터 값과 일치할 수 있도록 조건
        if (item['발생지시군구'] === data2) {
            return item;
        }
    });
    // console.log("선택1:",선택1)

    const 전체사고경도위도 = 선택1.map((item) => {
        return {
            title: item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });
    console.log('전체사고경도위도', 전체사고경도위도);
    //=====
    const 횡단중 = 선택1.filter((item) => {
        if (item['사고유형'] === '횡단중') {
            return item;
        }
    });
    // console.log("횡단중",횡단중)

    const 추돌 = 선택1.filter((item) => {
        if (item['사고유형'] === '추돌') {
            return item;
        }
    });

    const 공작물충돌 = 선택1.filter((item) => {
        if (item['사고유형'] === '공작물충돌') {
            return item;
        }
    });
    const 측면충돌 = 선택1.filter((item) => {
        if (item['사고유형'] === '측면충돌') {
            return item;
        }
    });
    const 기타 = 선택1.filter((item) => {
        if (
            item['발생지시도'] === '인천' &&
            !(item['사고유형'] === '공작물충돌') &&
            !(item['사고유형'] === '추돌') &&
            !(item['사고유형'] === '측면충돌') &&
            !(item['사고유형'] === '횡단중')
        ) {
            return item;
        }
    });

    const 횡단중사고 = 횡단중.map((item) => {
        return {
            title: item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });
    const 추돌사고 = 추돌.map((item) => {
        return {
            title: item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });
    const 공작물충돌사고 = 공작물충돌.map((item) => {
        return {
            title: item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });
    const 측면충돌사고 = 측면충돌.map((item) => {
        return {
            title: item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });
    const 기타사고 = 기타.map((item) => {
        return {
            title: '기타 - ' + item['사고유형'],
            latlng: {
                lat: item['위도'],
                lng: item['경도'],
            },
        };
    });

    console.log('기타', 기타사고);

    return (
        <div style={{ width: '100%', height: '80%', padding: '0 4rem 4rem 4rem' }}>
            <h3>전체사고지역</h3>

            <Map // 지도를 표시할 Container
                center={{
                    lat: '37.47928504819',
                    lng: '126.64224189279',
                }}
                style={{
                    // 지도의 크기
                    width: '100%',
                    height: '100%',
                }}
                level={9} // 지도의 확대 레벨
            >
                {전체사고경도위도.map((position, index) => {
                    if (position.title === '횡단중') {
                        return (
                            <>
                                <MapMarker
                                    key={index}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://cdn-icons-png.flaticon.com/512/98/98145.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 35,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            </>
                        );
                    }
                    if (position.title === '공작물충돌') {
                        return (
                            <MapMarker
                                key={`${position.title}-${position.latlng}`}
                                position={position.latlng} // 마커를 표시할 위치
                                image={{
                                    src: 'https://img.icons8.com/external-outline-chattapat-/512/external-accident-car-accident-outline-chattapat--4.png', // 마커이미지의 주소입니다
                                    size: {
                                        width: 35,
                                        height: 35,
                                    }, // 마커이미지의 크기입니다
                                }}
                                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            />
                        );
                    }
                    if (position.title === '추돌') {
                        return (
                            <MapMarker
                                key={`${position.title}-${position.latlng}`}
                                position={position.latlng} // 마커를 표시할 위치
                                image={{
                                    src: 'https://img.icons8.com/external-others-bomsymbols-/512/external-accident-car-others-bomsymbols--2.png', // 마커이미지의 주소입니다
                                    size: {
                                        width: 35,
                                        height: 35,
                                    }, // 마커이미지의 크기입니다
                                }}
                                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            />
                        );
                    }
                    if (position.title === '측면충돌') {
                        return (
                            <MapMarker
                                key={`${position.title}-${position.latlng}`}
                                position={position.latlng} // 마커를 표시할 위치
                                image={{
                                    src: 'https://img.icons8.com/ios-filled/512/car-crash.png', // 마커이미지의 주소입니다
                                    size: {
                                        width: 35,
                                        height: 35,
                                    }, // 마커이미지의 크기입니다
                                }}
                                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            />
                        );
                    }
                    if (
                        !(position.title === '공작물충돌') &&
                        !(position.title === '추돌') &&
                        !(position.title === '측면충돌') &&
                        !(position.title === '횡단중')
                    ) {
                        return (
                            <MapMarker
                                key={`${position.title}-${position.latlng}`}
                                position={position.latlng} // 마커를 표시할 위치
                                image={{
                                    src: 'https://img.icons8.com/ios-glyphs/512/high-importance.png', // 마커이미지의 주소입니다
                                    size: {
                                        width: 35,
                                        height: 35,
                                    }, // 마커이미지의 크기입니다
                                }}
                                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            />
                        );
                    }
                })}
            </Map>

            {횡단중사고.map((position, index) => {
                if (position.title != null) {
                    return (
                        <>
                            <h3>횡단중사고지역</h3>
                            <Map // 지도를 표시할 Container
                                center={position.latlng}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '100%',
                                }}
                                level={3} // 지도의 확대 레벨
                            >
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://cdn-icons-png.flaticon.com/512/98/98145.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title}
                                />
                            </Map>
                        </>
                    );
                }
            })}

            {측면충돌사고.map((position, index) => {
                if (position.title != null) {
                    return (
                        <>
                            <h3>측면충돌사고지역</h3>
                            <Map // 지도를 표시할 Container
                                center={position.latlng}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '100%',
                                }}
                                level={3} // 지도의 확대 레벨
                            >
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://img.icons8.com/ios-filled/512/car-crash.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            </Map>
                        </>
                    );
                }
            })}

            {추돌사고.map((position, index) => {
                if (position.title != null) {
                    return (
                        <>
                            <h3>추돌사고지역</h3>
                            <Map // 지도를 표시할 Container
                                center={position.latlng}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '100%',
                                }}
                                level={3} // 지도의 확대 레벨
                            >
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://img.icons8.com/external-others-bomsymbols-/512/external-accident-car-others-bomsymbols--2.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            </Map>
                        </>
                    );
                }
            })}
            {공작물충돌사고.map((position, index) => {
                if (position.title != null) {
                    return (
                        <>
                            <h3>공작물충돌사고지역</h3>
                            <Map // 지도를 표시할 Container
                                center={position.latlng}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '100%',
                                }}
                                level={3} // 지도의 확대 레벨
                            >
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://img.icons8.com/external-outline-chattapat-/512/external-accident-car-accident-outline-chattapat--4.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            </Map>
                        </>
                    );
                }
            })}
            {기타사고.map((position, index) => {
                if (position.title != null) {
                    return (
                        <>
                            <h3>기타사고지역</h3>
                            <Map // 지도를 표시할 Container
                                center={position.latlng}
                                style={{
                                    // 지도의 크기
                                    width: '100%',
                                    height: '100%',
                                }}
                                level={3} // 지도의 확대 레벨
                            >
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: 'https://img.icons8.com/ios-glyphs/512/high-importance.png', // 마커이미지의 주소입니다
                                        size: {
                                            width: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            </Map>
                        </>
                    );
                }
            })}
            <br></br>
            <br></br>
        </div>
    );
}

function TTable({ data, data1, data2, data3 }) {
    const 지역 = data.data.filter((item) => {
        if (item['발생지시도'] === '인천') {
            return item;
        }
    });
    // console.log(선택)

    const 시군구 = 지역.filter((item) => {
        //내가 선택한 데이터 값과 일치할 수 있도록 조건
        if (item['발생지시군구'] === data2) {
            return 1;
        }
    });
    // console.log(선택1)

    const 횡단중 = 시군구.filter((item) => {
        if (item['사고유형'] === '횡단중') {
            return item;
        }
    });
    const 측면충돌 = 시군구.filter((item) => {
        if (item['사고유형'] === '측면충돌') {
            return item;
        }
    });
    const 추돌 = 시군구.filter((item) => {
        if (item['사고유형'] === '추돌') {
            return item;
        }
    });
    const 공작물충돌 = 시군구.filter((item) => {
        if (item['사고유형'] === '공작물충돌') {
            return item;
        }
    });

    const 기타 = 시군구.filter((item) => {
        if (
            item['발생지시도'] === '인천' &&
            !(item['사고유형'] === '공작물충돌') &&
            !(item['사고유형'] === '추돌') &&
            !(item['사고유형'] === '측면충돌') &&
            !(item['사고유형'] === '횡단중')
        ) {
            return item;
        }
    });

    console.log('횡단', 횡단중);

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
                    <tr>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.발생지시도} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.발생지시군구} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.사고유형} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.발생년월일시} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.가해자법규위반} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.부상자수} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.중상자수} </p>
                            ))}
                        </td>
                        <td>
                            {횡단중.map((item, index) => (
                                <p key={index}> {item.사망자수} </p>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.발생지시도} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.발생지시군구} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.사고유형} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.발생년월일시} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.가해자법규위반} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.부상자수} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.중상자수} </p>
                            ))}
                        </td>
                        <td>
                            {측면충돌.map((item, index) => (
                                <p key={index}> {item.사망자수} </p>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.발생지시도} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.발생지시군구} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.사고유형} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.발생년월일시} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.가해자법규위반} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.부상자수} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.중상자수} </p>
                            ))}
                        </td>
                        <td>
                            {추돌.map((item, index) => (
                                <p key={index}> {item.사망자수} </p>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.발생지시도} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.발생지시군구} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.사고유형} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.발생년월일시} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.가해자법규위반} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.부상자수} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.중상자수} </p>
                            ))}
                        </td>
                        <td>
                            {공작물충돌.map((item, index) => (
                                <p key={index}> {item.사망자수} </p>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.발생지시도} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.발생지시군구} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}>(기타) - {item.사고유형} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.발생년월일시} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.가해자법규위반} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.부상자수} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.중상자수} </p>
                            ))}
                        </td>
                        <td>
                            {기타.map((item, index) => (
                                <p key={index}> {item.사망자수} </p>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

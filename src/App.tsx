import React, { useState, useEffect } from 'react';
import { Tab, Button, Divider, Transition, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from './types';
import { AccidentChart } from './components/AccidentChart';
import { AccidentMap } from './components/AccidentMap';
import { AccidentTable } from './components/AccidentTable';

uuidv4();

function fetchData(pageNumber: number): Promise<ApiResponse> {
    const url = `https://api.odcloud.kr/api/15070340/v1/uddi:4682264b-e754-4aa9-a0d7-b3dcd0f746b7?page=${pageNumber}&perPage=3000&serviceKey=%2BeKIiP9KuILfRQMYW6mwid1FuD6OBJvjLh02%2FwqpUdnFfeK6KePliqFYtnqxnSQALgi0pHrlQPK6XD%2BXh2tfyg%3D%3D`;

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
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [pageNumber] = useState<number>(1);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isMenuVisible, setIsMenuVisible] = useState<{ visible: boolean }>({ visible: false });

    useEffect(() => {
        fetchData(pageNumber)
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            })
            .finally(() => setIsLoaded(true));
    }, [pageNumber]);

    if (error) {
        return <p>failed to fetch</p>;
    }
    if (!isLoaded) {
        return <p>fetching data...</p>;
    }

    const toggleMenuVisibility = () => setIsMenuVisible((prevState) => ({ visible: !prevState.visible }));

    const { visible } = isMenuVisible;

    const panes = [
        {
            menuItem: (
                <Button animated="vertical" size="large" color="black">
                    <Button.Content hidden>차트</Button.Content>
                    <Button.Content visible>
                        <Icon name="chart bar" />
                    </Button.Content>
                </Button>
            ),
            render: () => (
                <div className="Table-back">
                    <Tab.Pane attached={false}>
                        <AccidentChart
                            data={data!}
                            selectedCity={selectedCity}
                            selectedDistrict={selectedDistrict}
                            accidentType={null}
                        />
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
                        <AccidentMap
                            data={data!}
                            selectedCity={selectedCity}
                            selectedDistrict={selectedDistrict}
                            accidentType={data!.data.filter((item) => selectedDistrict === item['발생지시군구'])}
                        />
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
                        <AccidentTable
                            data={data!}
                            selectedCity={selectedCity}
                            selectedDistrict={selectedDistrict}
                            accidentType={data!.data.filter((item) => selectedDistrict === item['발생지시군구'])}
                        />
                    </Tab.Pane>
                </div>
            ),
        },
    ];

    const cityList = data!.data.filter((item) => item['발생지시도'] === '인천').map((item) => item['발생지시도']);

    const handleCitySelect = (e: SelectChangeEvent<string>) => {
        setSelectedCity(e.target.value);
    };

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedCity('');
        setSelectedDistrict('');
        setIsMenuVisible((prevState) => ({ visible: !prevState.visible }));
    };

    const districtList = data!.data
        .filter((item) => selectedCity === item['발생지시도'])
        .map((item) => item['발생지시군구']);

    const handleDistrictSelect = (e: SelectChangeEvent<string>) => {
        setSelectedDistrict(e.target.value);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <Divider hidden />
                <h1>&#128664; 자동차 &#128664;</h1>
                <h1>사고 다발 지역 조회</h1>

                <div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="city-select-label">지역</InputLabel>
                            <Select onChange={handleCitySelect} value={selectedCity || ''}>
                                {Array.from(new Set(cityList)).map((item) => (
                                    <MenuItem value={item || ''} key={uuidv4()}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="district-select-label">시 군 구</InputLabel>
                            <Select onChange={handleDistrictSelect} value={selectedDistrict || ''}>
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                {Array.from(new Set(districtList)).map((item) => (
                                    <MenuItem value={item || ''} key={uuidv4()}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <button className="ui animated button" onClick={toggleMenuVisibility} tabIndex={0}>
                            <div className="visible content">조회</div>
                            <div className="hidden content">
                                <i className="search icon"></i>
                            </div>
                        </button>
                        <button className="ui animated button" onClick={handleReset} tabIndex={0}>
                            <div className="visible content">Reset</div>
                            <div className="hidden content">
                                <i className="undo icon"></i>
                            </div>
                        </button>
                    </Box>
                </div>
            </div>

            <Transition visible={visible} animation="scale" duration={500}>
                <div>
                    <div style={{ margin: '0 auto', width: '80%', padding: '4rem' }}>
                        <Tab menu={{ secondary: true }} panes={panes} />
                    </div>
                </div>
            </Transition>
        </div>
    );
}

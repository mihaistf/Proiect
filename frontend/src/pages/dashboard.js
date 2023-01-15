import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useGetAllHook } from '../features/experiences/experiences-hooks';
import AddExperienceModal from '../components/modal';
import { useDispatch } from 'react-redux';
import CircularSpinner from '../components/circular-spinner';

const transportationColors = {
    'all': 'rgba(24, 144, 255, 0.16)',
    'bus': '#34ed43',
    'metro': '#51adef',
    'tram': '#ef5151',
    'train': '#383535'
};

const transportationTranslate = {
    'all': 'default',
    'bus': 'Autobuz',
    'metro': 'Metrou',
    'tram': 'Tramvai',
    'train': 'Tren'
};

const MainContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`;

const CircularSpinnerWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`

const TopContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1600px;
    width: 100%;
    margin-bottom: 15px;
    height: 40px;
`;

const ExerciseTextContainer = styled('div')`
    display: flex;
    align-items: flex-end;
    height: 100%;
`;

const ExerciseText = styled('h2')`
    margin: 0;
`;

const AddExperienceButton = styled('button')`
    height: 100%;
    box-shadow: 0 8px 16px 0 rgb(0 171 85 / 24%);
    background-color: #00AB55;
    color: #fff;
    border: 0;
    border-radius: 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
`;

const TableContainer = styled('div')`
    max-width: 1600px;
    width: 100%;
    box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px;
    border-radius: 16px;
`;

const Table = styled('table')`
    width: 100%;
`;

const ChooseTransportationContainer = styled('div')`
    background-color: rgb(244, 246, 248);
    padding: 0 16px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    display: flex;
    gap: 20px;
`;

const TransportationButton = styled('button')`
    padding: 10px 0;
    background: none;
    border: none;
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    border-bottom-color: ${props => props.active ? `#00AB55` : 'transparent'};
`;

const TransportationNumber = styled('span')`
    color: rgb(12, 83, 183);
    background-color: ${props => transportationColors[props.transportation]};
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    color: ${props => props.lightColor ? '#fff' : '#000'};
`;

const TransportationText = styled('span')`
`;

const FiltersContainer = styled('div')`
    padding: 16px;
    display: flex;
    gap: 15px;
`;

const TableHead = styled('thead')`
    background-color: rgb(244, 246, 248);
    padding: ${props => props.padding ? props.padding : '0'};
`;

const TableBody = styled('tbody')`

`;

const TableRow = styled('tr')`
    display: flex;
    padding: ${props => props.padding ? props.padding : '0'};
    &:hover {
        background-color: rgb(244, 246, 248);
    }
`;

const TableHeader = styled('th')`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: center;
`;

const TableData = styled('td')`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: center;
`;

const PaginationContainer = styled('div')`
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    font-size: 14px;
    justify-content: end;
`;

const RowsPerPageText = styled('span')`
`;

const PaginationText = styled('span')`
    margin: 0 10px;
`

const PaginationSelectContainer = styled('div')`
    margin: 0 10px;
`;

const IconButtonContainer = styled('span')`
`;

const Dashboard = () => {
    // const rowsData = useMemo(() => [
    //     {
    //         id: 1,
    //         departure: 'Punct plecare 1',
    //         arrival: 'Punct sosire 1',
    //         transportation: 'Autobuz',
    //         hour: '18:30',
    //         duration: '120',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 3
    //     },
    //     {
    //         id: 2,
    //         departure: 'Punct plecare 2',
    //         arrival: 'Punct sosire 2',
    //         transportation: 'Autobuz',
    //         hour: '15:30',
    //         duration: '90',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 4
    //     },
    //     {
    //         id: 3,
    //         departure: 'Punct plecare 3',
    //         arrival: 'Punct sosire 3',
    //         transportation: 'Autobuz',
    //         hour: '19:30',
    //         duration: '60',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 2
    //     },
    //     {
    //         id: 4,
    //         departure: 'Punct plecare 4',
    //         arrival: 'Punct sosire 4',
    //         transportation: 'Autobuz',
    //         hour: '18:00',
    //         duration: '60',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 1
    //     },
    //     {
    //         id: 5,
    //         departure: 'Punct plecare 5',
    //         arrival: 'Punct sosire 5',
    //         transportation: 'Autobuz',
    //         hour: '18:30',
    //         duration: '120',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 5
    //     },
    //     {
    //         id: 6,
    //         departure: 'Punct plecare 6',
    //         arrival: 'Punct sosire 6',
    //         transportation: 'Autobuz',
    //         hour: '20:00',
    //         duration: '100',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 4
    //     },
    //     {
    //         id: 7,
    //         departure: 'Punct plecare 7',
    //         arrival: 'Punct sosire 7',
    //         transportation: 'Autobuz',
    //         hour: '10:00',
    //         duration: '60',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 3
    //     },
    //     {
    //         id: 8,
    //         departure: 'Punct plecare 8',
    //         arrival: 'Punct sosire 8',
    //         transportation: 'Autobuz',
    //         hour: '15:30',
    //         duration: '120',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 2
    //     },
    //     {
    //         id: 9,
    //         departure: 'Punct plecare 9',
    //         arrival: 'Punct sosire 9',
    //         transportation: 'Autobuz',
    //         hour: '13:30',
    //         duration: '120',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 3
    //     },
    //     {
    //         id: 10,
    //         departure: 'Punct plecare 10',
    //         arrival: 'Punct sosire 10',
    //         transportation: 'Autobuz',
    //         hour: '11:30',
    //         duration: '120',
    //         agglomeration: 'Putin aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 3
    //     },
    //     {
    //         id: 11,
    //         departure: 'Punct plecare 11',
    //         arrival: 'Punct sosire 11',
    //         transportation: 'Autobuz',
    //         hour: '16:30',
    //         duration: '45',
    //         agglomeration: 'Putin aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 3
    //     },
    //     {
    //         id: 12,
    //         departure: 'Punct plecare 12',
    //         arrival: 'Punct sosire 12',
    //         transportation: 'Autobuz',
    //         hour: '14:00',
    //         duration: '30',
    //         agglomeration: 'Foarte aglomerat',
    //         observations: 'Nicio observatie',
    //         satisfaction: 5
    //     }
    // ], [])

    const dispatch = useDispatch();

    const { data: experiences, message, severity, isLoading, isSuccess, isError } = useGetAllHook();

    console.log(experiences, isLoading)

    const [openModal, setOpenModal] = useState(false);

    const [allTransportations, setAllTransportations] = useState(true)
    const [busTransportation, setBusTransportation] = useState(false)
    const [metroTransportation, setMetroTransportation] = useState(false)
    const [tramTransportation, setTramTransportation] = useState(false)
    const [trainTransportation, setTrainTransportation] = useState(false)

    const [transportation, setTransportation] = useState('default')
    const [category, setCategory] = useState('default')
    const [section, setSection] = useState('default')
    const [destination, setDestination] = useState('')
    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(page * rowsPerPage)

    const [previousPageDisabled, setPreviousPageDisabled] = useState(true)
    const [nextPageDisabled, setNextPageDisabled] = useState(false)

    const [displayedRowsData, setDisplayedRowsData] = useState(experiences)
    const [filteredRowsData, setFilteredRowsData] = useState(experiences)

    const range = (first, last) => {
        let nrs = []
        for (let i = first; i <= last; i++)
            nrs.push(i)
        return nrs
    }

    const applyFilters = useCallback((filterParam) => {
        setDisplayedRowsData(experiences)

        // const { transportation, location, destination, rowsPerPage, page } = filterParam

        // const newRowsData = []

        // const transportationParam = transportation ? transportation : transportation
        // const locationParam = location ? location : location
        // const destinationParam = destination ? destination : destination
        // const rowsPerPageParam = rowsPerPage ? rowsPerPage : rowsPerPage
        // const pageParam = page ? page : page

        // for (let i = 0; i < rowsData.length; i++) {
        //     let transportationFilter = true
        //     let locationFilter = true
        //     let destinationFilter = true

        //     if (transportationParam !== 'default')
        //         transportationFilter = rowsData[i].transportation === transportationParam
        //     if (locationFilter !== '')
        //         locationFilter = rowsData[i].sections.includes(locationParam)
        //     if (destinationFilter !== '')
        //         destinationFilter = rowsData[i].title.includes(destinationParam)

        //     if (transportationFilter && locationParam && destinationParam)
        //         newRowsData.push(rowsData[i])
        // }

        // const limit = pageParam * rowsPerPageParam > newRowsData.length ? newRowsData.length : pageParam * rowsPerPageParam
        // const indexesRowsData = range((pageParam - 1) * rowsPerPageParam, limit - 1)

        // setLimit(limit)
        // setFilteredRowsData(newRowsData)
        // setDisplayedRowsData(indexesRowsData.map((index) => newRowsData[index]))
    }, [destination, location, transportation, rowsPerPage, page, experiences])

    const resetTransportations = () => {
        setAllTransportations(false);
        setBusTransportation(false);
        setMetroTransportation(false);
        setTramTransportation(false);
        setTrainTransportation(false);
    }

    const onClickTransportation = (transportation) => {
        resetTransportations();
        setTransportation(transportationTranslate[transportation]);
        applyFilters({ transportation: transportationTranslate[transportation] });
        resetPage();
        switch (transportation) {
            case "all":
                setAllTransportations(true)
                return;
            case "bus":
                setBusTransportation(true)
                return;
            case "metro":
                setMetroTransportation(true)
                return;
            case "tram":
                setTramTransportation(true)
                return;
            case "train":
                setTrainTransportation(true)
                return;
            default:
                setAllTransportations(true)
                return;
        }
    }

    const resetPage = (param = null) => {
        setPage(1)
        setPreviousPageDisabled(true)
        const rowsPerPageParam = param ? param : rowsPerPage
        if (rowsPerPageParam > filteredRowsData.length)
            setNextPageDisabled(true)
        else
            setNextPageDisabled(false)
    }

    const onChangeTextFieldLocation = (e) => {
        setTitle(e.target.value)
        applyFilters({ location: e.target.value })
        resetPage()
    }

    const onChangeTextFieldDestination = (e) => {
        setTitle(e.target.value)
        applyFilters({ destination: e.target.value })
        resetPage()
    }

    const onChangeSelectRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
        applyFilters({ rowsPerPage: e.target.value })
        resetPage(e.target.value)
    }

    const previousPage = () => {
        if (nextPageDisabled) setNextPageDisabled(false)
        if (page > 1) {
            setPage(page - 1)
            if (page === 2) setPreviousPageDisabled(true)
        }
    }

    const nextPage = () => {
        if (previousPageDisabled) setPreviousPageDisabled(false)
        if (rowsPerPage * (page) <= filteredRowsData.length) {
            setPage(page + 1)
            if (rowsPerPage * (page + 1) > filteredRowsData.length) setNextPageDisabled(true)
        }
    }

    const onChangeCheckboxHeader = (e) => {
        const checkbox = e.target;
        if (checkbox.checked) {
            setCheckboxChecked(true);
        }
        else {
            setCheckboxChecked(false);
        }
    }

    const getNumberTransportationExercises = (transportation) => {
        return experiences.filter((experience) => experience.transportation === transportation).length;
    }

    const handleClickOpenModal = () => {
        setOpenModal(true);
    }
    const handleClickCloseModal = () => setOpenModal(false);

    // useEffect(() => {
    //     // applyFilters();
    // }, [applyFilters])

    return (
        <>
            <MainContainer>
                <TopContainer>
                    <ExerciseTextContainer>
                        <ExerciseText>
                            Experiente
                        </ExerciseText>
                    </ExerciseTextContainer>
                    <AddExperienceButton onClick={handleClickOpenModal}>
                        <Add fontSize="small" />Adauga experienta
                    </AddExperienceButton>
                </TopContainer>
                <TableContainer>
                    <ChooseTransportationContainer>
                        <TransportationButton active={allTransportations} onClick={() => { onClickTransportation('all') }}>
                            <TransportationNumber transportation="all" lightColor={false}>{experiences.length}</TransportationNumber>
                            <TransportationText>Toate</TransportationText>
                        </TransportationButton>
                        <TransportationButton active={busTransportation} onClick={() => { onClickTransportation('bus') }}>
                            <TransportationNumber transportation="bus" lightColor={true}>{getNumberTransportationExercises(transportationTranslate['bus'])}</TransportationNumber>
                            <TransportationText>Autobuz</TransportationText>
                        </TransportationButton>
                        <TransportationButton active={metroTransportation} onClick={() => { onClickTransportation('metro') }}>
                            <TransportationNumber transportation="metro" lightColor={true}>{getNumberTransportationExercises(transportationTranslate['metro'])}</TransportationNumber>
                            <TransportationText>Metrou</TransportationText>
                        </TransportationButton>
                        <TransportationButton active={tramTransportation} onClick={() => { onClickTransportation('tram') }}>
                            <TransportationNumber transportation="tram" lightColor={true}>{getNumberTransportationExercises(transportationTranslate['tram'])}</TransportationNumber>
                            <TransportationText>Tramvai</TransportationText>
                        </TransportationButton>
                        <TransportationButton active={trainTransportation} onClick={() => { onClickTransportation('train') }}>
                            <TransportationNumber transportation="train" lightColor={true}>{getNumberTransportationExercises(transportationTranslate['train'])}</TransportationNumber>
                            <TransportationText>Tren</TransportationText>
                        </TransportationButton>
                    </ChooseTransportationContainer>
                    <FiltersContainer>
                        <TextField
                            id="title-textfield"
                            label="Plecare"
                            variant="outlined"
                            size="small"
                            placeholder="Introdu plecare..."
                            sx={{ flex: "1 1 50%" }}
                            onChange={onChangeTextFieldLocation}
                        />
                        <TextField
                            id="title-textfield"
                            label="Sosire"
                            variant="outlined"
                            size="small"
                            placeholder="Introdu destinatie..."
                            sx={{ flex: "1 1 50%" }}
                            onChange={onChangeTextFieldDestination}
                        />
                    </FiltersContainer>
                    <Table>
                        <TableHead padding='0 20px'>
                            <TableRow>
                                <TableHeader width='5%'>
                                    <Checkbox onChange={onChangeCheckboxHeader} />
                                </TableHeader>
                                <TableHeader width='15%'>
                                    {
                                        'Plecare'
                                    }
                                </TableHeader>
                                <TableHeader width='15%'>
                                    {
                                        'Sosire'
                                    }
                                </TableHeader>
                                <TableHeader width='10%'>
                                    {
                                        'Transport'
                                    }
                                </TableHeader>
                                <TableHeader width='10%'>
                                    {
                                        'Ora plecare'
                                    }
                                </TableHeader>
                                <TableHeader width='10%'>
                                    {
                                        'Durata'
                                    }
                                </TableHeader>
                                <TableHeader width='10%'>
                                    {
                                        'Grad aglomerare'
                                    }
                                </TableHeader>
                                <TableHeader width='15%'>
                                    {
                                        'Observatii'
                                    }
                                </TableHeader>
                                <TableHeader width='10%'>
                                    {
                                        'Nivel satisfactie'
                                    }
                                </TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                experiences.map((experience) => {
                                    return (
                                        <TableRow key={experience.id} data-id={experience.id} padding='5px 0'>
                                            <TableData width="5%">
                                                <Checkbox checked={checkboxChecked} />
                                            </TableData>
                                            <TableData width='15%'>
                                                {
                                                    experience.departure
                                                }
                                            </TableData>
                                            <TableData width='15%'>
                                                {
                                                    experience.arrival
                                                }
                                            </TableData>
                                            <TableData width='10%'>
                                                {
                                                    experience.transportation
                                                }
                                            </TableData>
                                            <TableData width='10%'>
                                                {
                                                    `${new Date(experience.time).getHours()}:${new Date(experience.time).getMinutes()}`
                                                }
                                            </TableData>
                                            <TableData width='10%'>
                                                {
                                                    experience.duration
                                                }
                                            </TableData>
                                            <TableData width='10%'>
                                                {
                                                    experience.crowded
                                                }
                                            </TableData>
                                            <TableData width='15%'>
                                                {
                                                    experience.observations
                                                }
                                            </TableData>
                                            <TableData width='10%'>
                                                {
                                                    experience.satisfaction
                                                }
                                            </TableData>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <PaginationContainer>
                        <RowsPerPageText>
                            Randuri per pagina:
                        </RowsPerPageText>
                        <PaginationSelectContainer>
                            <FormControl size="small" sx={{
                                flex: "1 1 15%",
                                width: "70px"
                            }}>
                                <InputLabel id="section-label"></InputLabel>
                                <Select
                                    labelId="section-label"
                                    id="section-select"
                                    value={rowsPerPage}
                                    onChange={onChangeSelectRowsPerPage}
                                    sx={{ fontSize: "14px" }}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                </Select>
                            </FormControl>
                        </PaginationSelectContainer>
                        <PaginationText>
                            {filteredRowsData.length === 0 ? '0' : (page - 1) * rowsPerPage + 1}-{limit} din {filteredRowsData.length}
                        </PaginationText>
                        <Tooltip title="Pagina anterioara">
                            <IconButtonContainer>
                                <IconButton
                                    size="small"
                                    color="inherit"
                                    disabled={previousPageDisabled}
                                    onClick={previousPage}
                                >
                                    <ChevronLeft />
                                </IconButton>
                            </IconButtonContainer>
                        </Tooltip>
                        <Tooltip title="Pagina urmatoare">
                            <IconButtonContainer>
                                <IconButton
                                    size="small"
                                    color="inherit"
                                    disabled={nextPageDisabled}
                                    onClick={nextPage}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </IconButtonContainer>
                        </Tooltip>
                    </PaginationContainer>
                </TableContainer>
            </MainContainer>
            <AddExperienceModal open={openModal} handleClose={handleClickCloseModal} />
        </>
    )
}

export default Dashboard;
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Modal as ModalMui, Select, TextField } from '@mui/material'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { create, resetExperiences } from '../features/experiences/experiences-slice';
import { useCreateHook } from '../features/experiences/experiences-hooks';
import { showToastr } from '../features/toastr/toastr-slice';


const Modal = styled(ModalMui)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled('div')`
    background-color: #fff;
    width: 500px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Title = styled('h2')`
    margin: 0 0 20px 0;
`

const DepartureTextField = styled(TextField)`
    width: 90%;
`

const ArrivalTextField = styled(TextField)`
    width: 90%;
`

const TransportationFormControl = styled(FormControl)`
    width: 90%;
`

const HourTimePicker = styled(TimePicker)`
    width: 90%;
    & .MuiInputBase-input {
        padding-top: 8.5px;
        padding-bottom: 8.5px;
    }
`

const DurationTextField = styled(TextField)`
    width: 90%;
`

const CrowdedFormControl = styled(FormControl)`
    width: 90%;
`

const ObservationsTextField = styled(TextField)`
    width: 90%;
`

const SatisfactionFormControl = styled(FormControl)`
    width: 90%;
`

const AddExperienceButtonWrapper = styled('div')`
`

const AddExperienceButton = styled('button')`
    background: none;
    padding: 10px 20px;
    :hover {
        cursor: pointer;
        opacity: .7;
    }
`

function AddExperienceModal({ open, handleClose }) {
    console.log('RENDER ADD EXPERIENCE MODAL');

    const { message, severity, isLoading, isSuccess, isError } = useCreateHook();

    console.log(isSuccess, isError);

    const dispatch = useDispatch();

    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [transportation, setTransportation] = useState('bus')
    const [time, setTime] = useState(Date.now())
    const [duration, setDuration] = useState(0)
    const [crowded, setCrowded] = useState('Nu e aglomerat')
    const [observations, setObservations] = useState('')
    const [satisfaction, setSatisfaction] = useState(1)

    const handleChangeDeparture = (event) => {
        setDeparture(event.target.value);
    }

    const handleChangeArrival = (event) => {
        setArrival(event.target.value);
    }

    const handleChangeTransportation = (event) => {
        setTransportation(event.target.value);
    }

    const handleChangeTime = (value) => {
        setTime(value);
    }

    const handleChangeDuration = (event) => {
        setDuration(event.target.value);
    }

    const handleChangeCrowded = (event) => {
        setCrowded(event.target.value);
    }

    const handleChangeObservations = (event) => {
        setObservations(event.target.value);
    }

    const handleChangeSatisfaction = (event) => {
        setSatisfaction(event.target.value);
    }

    const handleClickAddExperience = (event) => {
        dispatch(create({
            departure,
            arrival,
            transportation,
            time,
            duration,
            crowded,
            observations,
            satisfaction
        }))
    }

    useEffect(() => {
        if(isSuccess)
        {
            handleClose();
        }
        if(isSuccess || isError)
        {
            dispatch(showToastr({ message, severity }));
            dispatch(resetExperiences());
        }
    }, [isSuccess])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='title-modal'
        >
            <Container>
                <Title id='title-modal'>Adauga o experienta</Title>
                <DepartureTextField
                    id='departure'
                    label='Plecare'
                    placeholder='Introdu punct plecare...'
                    size='small'
                    onChange={handleChangeDeparture}
                />
                <ArrivalTextField
                    id='arrival'
                    label='Sosire'
                    placeholder='Introdu punct sosire...'
                    size='small'
                    onChange={handleChangeArrival}
                />
                <TransportationFormControl size='small'>
                    <InputLabel id='transportation-label'>Mijloc transport</InputLabel>
                    <Select
                        labelId='transportation-label'
                        id='transportation'
                        value={transportation}
                        label='Mijloc transport'
                        onChange={handleChangeTransportation}
                    >
                        <MenuItem value='bus'>Autobuz</MenuItem>
                        <MenuItem value='metro'>Metrou</MenuItem>
                        <MenuItem value='tram'>Tramvai</MenuItem>
                        <MenuItem value='train'>Tren</MenuItem>
                    </Select>
                </TransportationFormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <HourTimePicker
                        label='Time'
                        onChange={handleChangeTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <DurationTextField
                    id='duration'
                    label='Durata'
                    type='number'
                    size='small'
                    value={duration}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeDuration}
                />
                <CrowdedFormControl size='small'>
                    <InputLabel id='crowded'>Aglomeratie</InputLabel>
                    <Select
                        labelId='crowded-label'
                        id='crowded'
                        value={crowded}
                        label='Aglomerare'
                        onChange={handleChangeCrowded}
                    >
                        <MenuItem value='Nu e aglomerat'>Nu e aglomerat</MenuItem>
                        <MenuItem value='Aglomerat'>Aglomerat</MenuItem>
                        <MenuItem value='Foarte aglomerat'>Foarte aglomerat</MenuItem>
                    </Select>
                </CrowdedFormControl>
                <ObservationsTextField
                    id='observations'
                    label='Observatii'
                    size='small'
                    onChange={handleChangeObservations}
                />
                <SatisfactionFormControl size='small'>
                    <InputLabel id='satisfaction'>Nivel de satisfactie</InputLabel>
                    <Select
                        labelId='satisfaction-label'
                        id='satisfaction'
                        value={satisfaction}
                        label='Nivel de satisfactie'
                        onChange={handleChangeSatisfaction}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </SatisfactionFormControl>
                <AddExperienceButtonWrapper>
                    <AddExperienceButton
                        onClick={handleClickAddExperience}
                    >
                        Adauga experienta
                    </AddExperienceButton>
                </AddExperienceButtonWrapper>
            </Container>
        </Modal>
    )
}

export default AddExperienceModal
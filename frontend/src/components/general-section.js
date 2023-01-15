import { AddAPhoto, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, TextField } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { SEVERITIES } from "../constants/severities";
import { useUpdateHook } from "../features/auth/auth-hooks";
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { showToastr } from "../features/toastr/toastr-slice";
import { resetAuth, update } from "../features/auth/auth-slice";
import { FUNCTIONALITIES } from "../constants/functionalities";
import defaultUserAvatar from '../images/default-user-avatar.png'

const Section = styled('section')`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgb(140 152 164 / 13%) 0px 6px 24px 0px;
    flex-grow: 1;
    padding: 24px;
`

const Title = styled('h2')`
    font-size: 20px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 40px;
    color: rgb(52, 71, 103);
`

const Form = styled('form')`
`

const FieldsContainer = styled('div')`
    display: flex;
    gap: 20px;
    margin-bottom: 35px;
`

const OutlinedTextField = styled((props) => (<TextField variant='outlined' {...props} />))`
    flex-grow: 1;
    & .MuiOutlinedInput-root {
        border-radius: 4px;
    }
`

const SubmitButtonWrapper = styled('div')`
    flex: 0 0 33.33%;
    display: flex;
    justify-content: end;
    align-items: end;
`

const SubmitLoadingButton = styled(LoadingButton)`
    border-radius: 4px;
    background-color: #064C8C;
    color: #fff;
    text-transform: none;
    padding: 8px 16px;
    height: 40px;
    &.Mui-disabled {
        color: #fff;
    }
`

const SubmitButton = styled('button')`
    border-radius: 4px;
    background-color: #064C8C;
    color: #fff;
    text-transform: none;
    padding: 0 16px;
    height: 40px;
    border: 0;
    :disabled {
        background-color: rgba(200, 200, 200, 0.6);
        color: #000;
    }
    :hover:not(:disabled) {
        opacity: .7;
        cursor: pointer;
    }
`

function GeneralSection() {
    console.log('RENDER GENERAL SECTION COMPONENT')

    const { data: user, message, severity, isLoading, isSuccess, isError } = useUpdateHook();

    const dispatch = useDispatch();

    const avatarRef = useRef(null);

    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarOpacity, setAvatarOpacity] = useState(0);

    const [uri, setUri] = useState(
        user.avatarUri
            ? `${process.env.REACT_APP_BACKEND_IMAGES_URL}/${user.avatarUri}`
            : defaultUserAvatar
    )

    const isSubmitButtonDisabled = lastName === user.lastName && firstName === user.firstName && avatarFile === null

    const handleChangeLastName = (event) => setLastName(event.target.value);

    const handleChangeFirstName = (event) => setFirstName(event.target.value);

    const setImageSrc = (event) => {
        if (!avatarRef.current)
            return;
        if (!event.target)
            return;
        const img = avatarRef.current.children[0];
        const src = event.target.result;
        img.src = src;
    }

    const verifyUploadPhoto = (file) => {
        if (!file)
            return false;
        if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
            showToastr({
                message: 'Tipul fisierului incarcat nu face parte din cele admise!',
                severity: SEVERITIES.ERROR
            });
            return false;
        }
        if (file.size > 6 * 1000 * 1000) {
            showToastr({
                message: 'Dimensiunea fisierului incarcat depaseste limita admisa!',
                severity: SEVERITIES.ERROR
            });
            return false;
        }
        return true;
    }

    const previewProfileImage = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file && verifyUploadPhoto(file)) {
            const reader = new FileReader();
            reader.onload = setImageSrc;
            reader.readAsDataURL(file);
            setAvatarFile(file);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const requestPayload = new FormData(event.currentTarget);

        requestPayload.append('id', user.id);

        dispatch(update(requestPayload));
    }

    useEffect(() => {
        if (isError || isSuccess) {
            dispatch(showToastr({ message, severity }));
            dispatch(resetAuth(FUNCTIONALITIES.UPDATE));
        }
    }, [message, severity, isSuccess, isError, dispatch])

    return (
        <Section>
            <Title>
                Schimbare date personale
            </Title>
            <Form onSubmit={handleSubmit}>
                <FieldsContainer>
                    <OutlinedTextField
                        label='Nume'
                        placeholder='Introdu nume'
                        value={lastName}
                        onChange={handleChangeLastName}
                        name="lastName"
                    />
                    <OutlinedTextField
                        label='Prenume'
                        placeholder='Introdu prenume'
                        value={firstName}
                        onChange={handleChangeFirstName}
                        name="firstName"
                    />
                </FieldsContainer>
                <SubmitButtonWrapper>
                    {
                        isLoading ?
                            <SubmitLoadingButton loading loadingPosition="start" startIcon={<Save />} variant="outlined">
                                Salveaza modificari
                            </SubmitLoadingButton>
                            :
                            <SubmitButton type='submit' disabled={isSubmitButtonDisabled}>
                                Salveaza modificari
                            </SubmitButton>
                    }
                </SubmitButtonWrapper>
            </Form>
        </Section>
    )
}

export default GeneralSection;
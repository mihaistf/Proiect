import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '../../constants/errors';
import { SEVERITIES } from '../../constants/severities';
import { STATUSES } from '../../constants/statuses';
import { localStorageGetItem, localStorageSetItem } from '../../utils/local-storage';
import experiencesService from './experiences-service';

const experiencesData = localStorageGetItem('experiencesData', 'array');

const initialState = {
    data: experiencesData,
    message: undefined,
    severity: undefined,
    status: undefined,
}

export const create = createAsyncThunk(
    'experiences/create',
    async (requestPayload, { rejectWithValue }) => {
        const response = await experiencesService.create(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        return responsePayload;
    }
)

export const readAll = createAsyncThunk(
    'experiences/read-all',
    async (requestPayload, { rejectWithValue }) => {
        const response = await experiencesService.readAll(requestPayload);

        const responsePayload = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(responsePayload);
        }

        localStorageSetItem('experiencesData', responsePayload);

        return responsePayload;
    }
)

export const experiencesSlice = createSlice({
    name: 'experiences',
    initialState,
    reducers: {
        resetExperiences: (state) => {
            state.message = undefined;
            state.severity = undefined;
            state.status = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.status = STATUSES.PENDING;
            })
            .addCase(create.fulfilled, (state, { payload }) => {
                state.status = STATUSES.FULFILLED;
                state.message = payload.message;
                state.severity = payload.severity;
            })
            .addCase(create.rejected, (state, { payload }) => {
                state.status = STATUSES.REJECTED;
                state.message = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severity = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
            .addCase(readAll.pending, (state) => {
                state.status = STATUSES.PENDING;
            })
            .addCase(readAll.fulfilled, (state, { payload }) => {
                state.status = STATUSES.FULFILLED;
                state.data = payload;
            })
            .addCase(readAll.rejected, (state, { payload }) => {
                state.status = STATUSES.REJECTED;
                state.message = payload?.message ? payload.message : UNKNOWN_ERROR;
                state.severity = payload?.severity ? payload.severity : SEVERITIES.ERROR;
            })
    }
})

export const { resetExperiences } = experiencesSlice.actions;
export default experiencesSlice.reducer;
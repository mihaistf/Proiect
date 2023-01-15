import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import toastrReducer from '../features/toastr/toastr-slice';
import experiencesReducer from '../features/experiences/experiences-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        toastr: toastrReducer,
        experiences: experiencesReducer
    }
})

export default store;
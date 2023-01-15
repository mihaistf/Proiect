import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { readAll } from './experiences-slice';

const useCreateHook = () => {
    const message = useSelector((state) => state.experiences.message);
    const severity = useSelector((state) => state.experiences.severity);
    const status = useSelector((state) => state.experiences.status);

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { message, severity, isLoading, isSuccess, isError };
}

const useGetAllHook = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.experiences.data);
    const message = useSelector((state) => state.experiences.message);
    const severity = useSelector((state) => state.experiences.severity);
    const status = useSelector((state) => state.experiences.status);

    useEffect(() => {
        dispatch(readAll());
    }, [dispatch])

    const isLoading = status === 'pending';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, message, severity, isLoading, isSuccess, isError };
}

export {
    useCreateHook,
    useGetAllHook
}
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { hideToastr } from '../features/toastr/toastr-slice';

function Toastr() {
    const dispatch = useDispatch();

    const {open, message, severity} = useSelector(state => state.toastr);

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway')
            return;
        dispatch(hideToastr());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
             <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toastr;
import styles from './Error.module.css'
import errorPage from "../../assets/images/error_page404.png";
import Button from '@mui/material/Button';
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

export const Error404 = React.memo(() => {
    const navigate = useNavigate();

    const toLogin = useCallback(() => {
        let path = `/login`;
        navigate(path,{ replace: true });
    }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={errorPage} alt="not_found_404"/>
            </div>
            <Button
                style={{position: 'fixed', bottom: '20px', right: '90px'}}
                onClick={toLogin}
                type={'submit'}
                variant="contained"
                sx={{mt: 3 , mb: 2}}>
                Go back
            </Button>
        </div>
    )
})
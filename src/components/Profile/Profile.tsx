import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./profile.module.css";
import {Button, LinearProgress, Paper, TextField} from '@mui/material';
import {changeName, getCurrentUser, logout, UserType} from '../../reducers/profileReducers';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {Navigate} from "react-router-dom";

export const Profile = () => {

    const {name, email, avatar} = useAppSelector<UserType>(state => state.profile)
    const {isLoggedIn, appStatus} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrentUser())
        setLocalName(name)
    }, [name, dispatch])

    const [localName, setLocalName] = useState<string>(name)
    const validateName = localName === '' || localName === name
    const changeNickNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.currentTarget.value)
    }

    const changeProfileName = () => {
        dispatch(changeName(localName))
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return <div className={styles.container}>
        {appStatus === 'inProgress' && <LinearProgress/>}
        <Paper className={styles.block}>
            <div className={styles.box}>
                <h2 className={styles.textH2}>Personal Information</h2>
                <div className={styles.image}>
                    <img className={styles.imageBlock} src={avatar} alt={'avatar'}/>
                </div>
                <div className={styles.inputContainer}>
                    <TextField
                        label='Name'
                        variant={'standard'}
                        margin={'normal'}
                        className={styles.inputBlock}
                        value={localName}
                        onChange={changeNickNameHandler}
                    />
                    <TextField
                        label='Email'
                        variant={'standard'}
                        margin={'normal'}
                        className={styles.inputBlock}
                        value={email}
                    />
                </div>

                <div className={styles.bottomBtns}>
                    <Button
                        className={styles.button}
                        disabled={validateName}
                        onClick={changeProfileName}
                        variant="contained"
                        color="primary">
                        Save
                    </Button>
                    <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        onClick={logoutHandler}
                    >Logout
                    </Button>
                </div>
            </div>
        </Paper>
    </div>
}

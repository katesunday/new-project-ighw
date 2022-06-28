import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./profile.module.css";
import {Button, LinearProgress, TextField} from '@mui/material';
import {changeName, getCurrentUser, logout, UserType} from '../../reducers/profileReducers';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {Navigate} from "react-router-dom";


export const Profile = () => {
    const {name, email, avatar} = useAppSelector<UserType>(state => state.profile)
    const {isLoggedIn, appStatus} = useAppSelector(state => state.app)
    console.log(isLoggedIn, appStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(isLoggedIn) dispatch(getCurrentUser())
        console.log('effect')
    }, [name, email, avatar, dispatch])

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

    if (!isLoggedIn) return <Navigate to="/login"/>

    return <div className={styles.container}>
        {appStatus === 'inProgress' && <LinearProgress/>}
        <div className={styles.block}>

            <h2 className={styles.textH2}>Personal Information</h2>

            <div className={styles.image}>
                <img className={styles.imageBlock} src={avatar} alt={'avatar'}/>
                <Button
                    style={{ borderRadius : '20px', minWidth : '150px', margin: '20px 20px 0 0'}}
                    className={styles.logout}
                    variant="contained"
                    color="error"
                    onClick={logoutHandler}
                >Logout
                </Button>
            </div>

            <div className={styles.inputContainer}>
                <TextField
                    variant={'standard'}
                    margin={'normal'}
                    className={styles.inputBlock}
                    value={localName}
                    label='Name'
                    onChange={changeNickNameHandler}
                />
                 <TextField
                    variant={'standard'}
                    margin={'normal'}
                    className={styles.inputBlock}
                    value={email}
                    label='Email'
                />
            </div>

            <div>
                <Button
                        style={{ borderRadius : '20px', minWidth : '150px', marginTop: '20px'}}
                        className={styles.button}
                        disabled={validateName}
                        onClick={changeProfileName}
                        variant="contained"
                        color="primary">
                        Save
                </Button>
            </div>
        </div>
    </div>
}
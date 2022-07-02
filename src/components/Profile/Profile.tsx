import React, {ChangeEvent, useCallback, useEffect, useState, KeyboardEvent} from 'react';
import styles from "./profile.module.css";
import {Button, LinearProgress, Paper, TextField} from '@mui/material';
import {changeName, getCurrentUser, logout, UserType} from '../../reducers/profileReducers';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {Navigate} from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


export const Profile = React.memo(() => {

    const {name, email, avatar} = useAppSelector<UserType>(state => state.profile)
    const {isLoggedIn, appStatus} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrentUser())
        setLocalName(name)
    }, [dispatch, name])

    const [localName, setLocalName] = useState<string>(name)
    const validateName = localName === '' || localName === name

    const changeNickNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.currentTarget.value)
    }, [setLocalName])

    const [editMode, setEditMode] = useState(false)
    const changeEditMode = useCallback(() => {
        setEditMode(!editMode)
    }, [editMode])

    const onKeyPressNameHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter') {
            setEditMode(!editMode)
        }
    }, [editMode])

    const changeProfileName = useCallback(() => {
        dispatch(changeName(localName))
    }, [dispatch, localName])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

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
                        onKeyPress={onKeyPressNameHandler}
                        disabled={!editMode}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={changeEditMode}
                                    edge="end">
                                    {<BorderColorIcon/>}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <p className={styles.inputBlock}>E-mail: {email}</p>
                </div>

                <div className={styles.bottomBtns}>
                    <Button
                        className={styles.button}
                        disabled={!(!editMode && !validateName)}
                        onClick={changeProfileName}
                        variant="contained"
                        color="primary">
                        Save
                    </Button>
                    <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        onClick={logoutHandler}>
                        Logout
                    </Button>
                </div>
            </div>
        </Paper>
    </div>
})

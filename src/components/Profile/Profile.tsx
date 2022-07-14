import React, {ChangeEvent, useCallback, useEffect, useState, KeyboardEvent} from 'react';
import styles from "./Profile.module.css";
import {changeName, logout} from '../../reducers/profileReducers';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Preloader from '../../common/Preloader/Preloader';

export const Profile = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const avatar = useAppSelector(state => state.profile.avatar)
    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const [localName, setLocalName] = useState(name)
    const validateName = localName === '' || localName === name

    useEffect(() => {
        setLocalName(name)
    }, [dispatch, name])

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

    const backHandler = () => {
        navigate('/profilePacks')
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return <div className={styles.container}>
        {appStatus === 'succeeded' ?
            <Paper className={styles.block}>
            <IconButton
                className={styles.button}
                onClick={backHandler}
                color={'primary'}
                sx={{mt: 3, mb: 2}}>
                <ReplyIcon fontSize={'large'}/>
            </IconButton>
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
            : <Preloader/>}
    </div>
})

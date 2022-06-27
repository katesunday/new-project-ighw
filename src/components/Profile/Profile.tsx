import React, {useState} from 'react';
import styles from "./profile.module.css";
import {Button, TextField} from "@mui/material";
import {AuthDataType, changeProfileDataTC, logoutTC} from "../../reducers/profileReducers";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {Navigate} from "react-router-dom";


export const Profile = () => {
    const {name, email, avatar} = useAppSelector<AuthDataType>(state => state.profile)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    const [nickNameValue, setNickNameValue] = useState<string>(name)

    const saveButtonDisable = !nickNameValue || name === nickNameValue

    const changeProfileData = () => {
        dispatch(changeProfileDataTC(nickNameValue))
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) return <Navigate to="/login"/>


    return <div className={styles.container}>
        <div className={styles.block}>

            <h2 className={styles.textH2}>Personal Information</h2>

            <div className={styles.image}>
                <img className={styles.imageBlock} src={avatar} alt={'avatar'}/>
                <Button
                    style={{ borderRadius : '20px', minWidth : '150px'}}
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
                    value={nickNameValue}
                    label='Name'
                    onChange={(e) => setNickNameValue(e.currentTarget.value)}
                />
                <TextField
                    variant={'standard'}
                    margin={'normal'}
                    className={styles.inputBlock}
                    value={email}
                    label='Email'
                    disabled
                />
            </div>

            <div>
                <Button
                        style={{ borderRadius : '20px', minWidth : '150px'}}
                        className={styles.button}
                        disabled={saveButtonDisable}
                        onClick={changeProfileData}
                        variant="contained"
                        color="primary">
                        Save
                </Button>
            </div>
        </div>
    </div>
}

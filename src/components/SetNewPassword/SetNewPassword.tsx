import React, {useCallback, useState} from 'react';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment, LinearProgress, Paper} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {ErrorSnackbar} from "../../common/ErrorSnackbar/ErrorSnackBar";
import {useFormik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {setNewPWTC, setPWStatusAC} from "../../reducers/restorePWReducers";
import styles from "./setNewPassword.module.css";

type FormikErrorType = {
    password?: string
}
const SetNewPassword = React.memo(() => {
    const dispatch = useAppDispatch()
    const isPWSent = useAppSelector(state => state.restorePassword.isPWSent)
    const [passVisibility, setPassVisibility] = useState(false)
    const changeVisibility = () => {
        setPassVisibility(!passVisibility)
    }
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 7) {
                errors.password = 'Minimum 7 symbols required';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            console.log(token)

            if (token) {
                dispatch(setPWStatusAC('onprogress'))
                dispatch(setNewPWTC(values.password, token))
            }
            formik.resetForm()
        },
    })

    const navigate = useNavigate();
    const toLogin = useCallback(() => {
        let path = `/login`;
        navigate(path, {replace: true});
    }, [navigate])

    //when password is submited
    if (isPWSent === 'sent') {
        return <div>
            <Grid item justifyContent={'center'}>
                <Paper className={styles.block}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Password is successfully restored. Woohoo!
                        </Typography>
                        <Button
                            onClick={toLogin}
                            type={'submit'}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Go to login page.
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </div>
    }
    return (
        <div>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper className={styles.block}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create new password
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={passVisibility ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                error={!!(formik.errors.password && formik.touched.password)}
                                helperText={formik.touched.password && formik.errors.password
                                    ? formik.errors.password : null}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={changeVisibility}
                                            edge="end">
                                            {passVisibility ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                {...formik.getFieldProps('password')}
                            />
                            <Button
                                disabled={isPWSent === 'onprogress'}
                                type={'submit'}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Create new password
                            </Button>
                            {isPWSent === 'onprogress' && <LinearProgress style={{width: '-webkit-fill-available'}}/>}
                        </Box>
                    </Paper>
                </form>
            </Grid>
            <ErrorSnackbar/>
        </div>
    );
})

export default SetNewPassword;
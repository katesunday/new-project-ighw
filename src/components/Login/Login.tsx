import React, {useCallback, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {ErrorSnackbar} from '../../common/ErrorSnackbar/ErrorSnackBar';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {login} from '../../reducers/appReducer';
import Paper from '@mui/material/Paper';
import styles from './Login.module.css';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

    const [passVisibility, setPassVisibility] = useState(false)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [passVisibility])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) return <Navigate to='/profile'/>

    return (
        <Grid item justifyContent={'center'}>

            <form onSubmit={formik.handleSubmit}>
                <Paper className={styles.container}>
                    <CssBaseline/>
                    <Box className = {styles.boxStyles}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <TextField
                            color={"secondary"}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            error={!!(formik.errors.email && formik.touched.email)}
                            {...formik.getFieldProps('email')}
                            helperText={formik.touched.email && formik.errors.email
                                ? formik.errors.email : null}
                        />
                        <TextField
                            color={"secondary"}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type={passVisibility ? 'text' : 'password'}
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

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button
                            type={'submit'}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!!(formik.errors.email || formik.errors.password)}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to='/restorePassword'>
                                    <span>Forgot password?</span>
                                </NavLink>
                            </Grid>
                            <Grid item style={{textAlign: 'center'}}>
                                <span>Don't have an account?<br/></span>
                                <NavLink to='/registration'>
                                   <span> Sign Up</span>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </form>
            <ErrorSnackbar/>
        </Grid>
    );
})
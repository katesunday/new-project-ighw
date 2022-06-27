import React , {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useFormik} from "formik";
import {loginTC} from "../reducers/loginReducers";
import { Navigate } from 'react-router-dom';
import {IconButton , InputAdornment} from "@mui/material";
import {Visibility , VisibilityOff} from "@mui/icons-material";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackBar";
import {useAppDispatch, useAppSelector} from "../utils/hooks";



type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {
    const dispatch = useAppDispatch()
     const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const [passVisibility, setPassVisibility] = useState(false)
    const changeVisibility = () => {
      setPassVisibility(!passVisibility)
    }

    const formik = useFormik({
        initialValues: {
            email: '' ,
            password: '' ,
            rememberMe: false
        } ,
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
        } ,
        onSubmit: values => {
            console.log(values)
            dispatch(loginTC(values))
            formik.resetForm()
        } ,
    })
    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }
    return (
        <div>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 8 ,
                                    display: 'flex' ,
                                    flexDirection: 'column' ,
                                    alignItems: 'center' ,
                                }}
                            >
                                <Avatar sx={{m: 1 , bgcolor: 'secondary.main'}}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                    <TextField
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
                                            ? formik.errors.email: null}
                                    />
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
                                            ? formik.errors.password: null}
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
                                        sx={{mt: 3 , mb: 2}}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                            </Box>
                        </Container>
            </form>
        </Grid>
            <ErrorSnackbar/>
        </div>
    );
};

export default Login;
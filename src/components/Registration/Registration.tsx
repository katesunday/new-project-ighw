import React, {useCallback, useState} from 'react';
import {useFormik} from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {createNewUser} from '../../reducers/registrationReducers';
import {ErrorSnackbar} from '../../common/ErrorSnackbar/ErrorSnackBar';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Paper} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import {Navigate, NavLink} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styles from './Registration.module.css';

type FormikErrorsType = {
    email?: string
    pass?: string
    repeatPass?: string
}

const Registration = React.memo(() => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector((state) => state.app.appStatus)
    const formik = useFormik({
        initialValues: {
            email: '',
            pass: '',
            repeatPass: ''
        },
        validate: (values) => {
            const errors: FormikErrorsType = {};
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

                errors.email = 'Invalid email address'
            }

            if (!values.pass) {
                errors.pass = 'Required';
            } else if (values.pass.length < 7) {
                errors.pass = 'Min length is 7 symbols'
            }

            if (!values.repeatPass) {
                errors.repeatPass = 'Required';
            } else if (values.pass !== values.repeatPass) {
                errors.repeatPass = 'Not the same as password field'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(createNewUser({email: values.email, password: values.pass}))
            formik.resetForm()
        }
    })

    const [passVisibility, setPassVisibility] = useState<boolean>(true)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [dispatch, passVisibility])

    if (appStatus === 'succeeded') {
        return <Navigate to='/login'/>
    }
    return (
        <div>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper className={styles.block}>
                        <Box className = {styles.boxStyles}>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <TextField label='E-mail'
                                       margin='normal'
                                       required
                                       fullWidth
                                       autoFocus
                                       autoComplete="email"
                                       helperText={(formik.errors.email && formik.touched.email) ? formik.errors.email : 'Please enter your email'}
                                       error={!!formik.errors.email && formik.touched.email}
                                       {...formik.getFieldProps('email')}/>
                            <TextField label='Password'
                                       margin='normal'
                                       required
                                       fullWidth
                                       helperText={(formik.errors.pass && formik.touched.pass) ? formik.errors.pass : 'Please enter your password'}
                                       type={passVisibility ? 'password' : 'text'}
                                       error={!!formik.errors.pass && formik.touched.pass}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps('pass')}/>

                            <TextField label='Confirm your password'
                                       margin='normal'
                                       required
                                       fullWidth
                                       helperText={(formik.errors.repeatPass && formik.touched.repeatPass) ? formik.errors.repeatPass : 'Confirm your password'}
                                       type={passVisibility ? 'password' : 'text'}
                                       error={!!formik.errors.repeatPass && formik.touched.repeatPass}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps('repeatPass')}/>

                            <Button sx={{mt: 3, mb: 2}}
                                    fullWidth
                                    type={'submit'}
                                    variant={'contained'}
                                    disabled={!!(formik.errors.email || formik.errors.pass || formik.errors.repeatPass)}>
                                Register
                            </Button>
                            <Grid item>
                                <NavLink to='/login'>
                                    <span>Back to login</span>
                                </NavLink>
                            </Grid>
                        </Box>
                    </Paper>
                </form>
            </Grid>
            <ErrorSnackbar/>
        </div>
    )
})

export default Registration;



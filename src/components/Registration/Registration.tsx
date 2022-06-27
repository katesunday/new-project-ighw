import React, {useState, MouseEvent} from 'react';
import {useFormik} from 'formik';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {createNewUser} from '../../reducers/registrationReducers';
import {ErrorSnackbar} from '../../common/ErrorSnackbar/ErrorSnackBar';
import {useAppDispatch} from '../../hooks';
import {LinearProgress} from '@mui/material';
import {AppRootStateType} from '../../store/store';
import {AppStatusType} from '../../reducers/appReducer';
import {useSelector} from 'react-redux';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import s from './Registration.module.css'
import {Navigate} from "react-router-dom";

type FormikErrorsType = {
    email?: string
    pass?: string
    repeatPass?: string
}

const Registration = () => {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, AppStatusType>((state) => state.app.appStatus)


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

    const [passVisibility, setPassVisibility] = useState<boolean>(false)

    const changeVisibility = () => {
        setPassVisibility(!passVisibility)
    }

    if (status ==='succeeded') {
        return <Navigate to='/login'/>
    }
    return (
        <div>
            {status === 'inProgress' && <LinearProgress/>}
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'} className={s.box}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel style={{
                                textAlign: 'center',
                                fontSize: '32px',
                                fontWeight: 'bolder',
                                color: 'white',
                                margin: '0'
                            }}>
                                <p>Registration</p>
                            </FormLabel>
                            <FormGroup>
                                <TextField label='E-mail'
                                           margin='normal'
                                           helperText={(formik.errors.email && formik.touched.email) ? formik.errors.email : 'Please enter your email'}
                                           error={!!formik.errors.email && formik.touched.email}
                                           {...formik.getFieldProps('email')}/>

                                <TextField label='Password'
                                           margin='normal'
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
                            </FormGroup>
                            <Button style={{marginTop: '15px'}}
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'success'}
                                    disabled={!!(formik.errors.email || formik.errors.pass || formik.errors.repeatPass)}>
                                Register
                            </Button>
                        </FormControl>
                    </form>
                    <ErrorSnackbar/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Registration;
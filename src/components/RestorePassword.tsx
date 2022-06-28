import React from 'react';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackBar";
import {useFormik} from "formik";
import {restorePWTC , setPWStatusAC} from "../reducers/RestorePWReducers";
import {useAppDispatch , useAppSelector} from "../utils/hooks";
import {LinearProgress} from "@mui/material";
import {NavLink} from "react-router-dom";

type FormikErrorType = {
    email?: string
}
const RestorePassword = () => {
    const dispatch = useAppDispatch()
    const isPWSent = useAppSelector(state => state.restorePassword.isPWSent)
    const formik = useFormik({
        initialValues: {
            email: ''
        } ,
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        } ,
        onSubmit: values => {
            dispatch(setPWStatusAC('onprogress'))
            dispatch(restorePWTC(values.email))
            console.log(values)
            formik.resetForm()
        } ,
    })
    //page when PW was sent
    if (isPWSent === 'sent') {
        return <div>
            <Grid item justifyContent={'center'}>
                <Container component="main" maxWidth="xs">
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
                            Link to restore your password was successfully sent to you email.
                            Please check it.
                        </Typography>

                    </Box>
                </Container>
            </Grid>
        </div>
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
                                Forgot your password?
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                error={!!(
                                    formik.errors.email && formik.touched.email)}
                                {...formik.getFieldProps('email')}
                                helperText={formik.touched.email && formik.errors.email
                                    ? formik.errors.email : 'Enter your email and we will send you further instructions'}
                            />

                            <Button
                                disabled={isPWSent === 'onprogress'}
                                type={'submit'}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3 , mb: 2}}
                            >
                                Send Instructions
                            </Button>
                            {isPWSent === 'onprogress' && <LinearProgress style={{width: '-webkit-fill-available'}}/>}
                            <Grid container>
                                <Grid item xs>
                                    <NavLink to='/login'> <Link href="#" variant="body2">
                                        Did you remember your password?
                                    </Link></NavLink>

                                </Grid>
                                <Grid item>
                                    <NavLink to='/login'> <Link href="#" variant="body2">
                                        {"Try logging in"}
                                    </Link></NavLink>

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

export default RestorePassword;
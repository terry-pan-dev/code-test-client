import React, { useRef, useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'
import {
    Alert
} from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom'
import useStyles from './style'



export default function SignUp() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;
        if (password !== passwordConfirm) {
            return setError("password does not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(email, password)
            setSuccess("succssfully created")
        } catch {
            setError('failed to create an account')
        }
        setLoading(false)
    }

    const AlertInfo = () => {
        if (error) {
            return (
                <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                </Grid>
            )
        }
        if (success) {
            return (
                <Grid item xs={12}>
                    <Alert severity="success">{success}</Alert>
                </Grid>
            )
        }
        return null;
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {AlertInfo()}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={passwordRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password-confirmation"
                                label="Password Confirmation"
                                type="password"
                                id="password-confirmation"
                                inputRef={passwordConfirmRef}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/login'>
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
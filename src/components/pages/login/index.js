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
import VpnKey from '@material-ui/icons/VpnKey'
import { useAuth } from '../../contexts/authContext'
import { Link, useHistory } from 'react-router-dom'
import useStyles from './style'

export default function Login() {
    const classes = useStyles()
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            history.push('/map')
        } catch {
            setError('cannot login by provided credentials')
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
        return null;
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKey />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
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
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container justify="center">
                        <Link to='/password-reset'>
                            Forgot Password?
                        </Link>
                    </Grid>
                    <Grid container justify="center">
                        <Link to='/signup'>
                            Do not have an account? Sign up
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

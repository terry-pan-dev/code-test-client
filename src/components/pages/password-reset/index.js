import React, { useRef, useState } from 'react';
import {
    Button,
    TextField,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'
import {
    Alert
} from '@material-ui/lab'
import { useAuth } from '../../contexts/authContext'
import useStyles from './style'

export default function Login() {
    const classes = useStyles()
    const emailRef = useRef();
    const { passwordReset } = useAuth();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        try {
            setError('')
            setLoading(true)
            await passwordReset(email)
            setSuccess("a password reset link sent to you mail")
        } catch {
            setError('cannot reset provided password')
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
                <Typography component="h1" variant="h5">
                    Reset Password
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
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </Container>
    )
}

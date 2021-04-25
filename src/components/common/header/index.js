import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
} from '@material-ui/core';
import {
    Link,
    useHistory,
} from 'react-router-dom';
import useStyles from './style';
import { useAuth } from '../../contexts/authContext';

export default function Header() {
    const classes = useStyles();
    const { isAuthenticated, logout } = useAuth()
    let history = useHistory()

    const signout = () => {
        logout()
        history.push('/')
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to='/' className={classes.logo}>
                            Google Place
                        </Link>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {!isAuthenticated ? (
                            <>
                                <MenuItem
                                    component={Link}
                                    to={"/signup"}
                                >Sign Up</MenuItem>
                                <MenuItem
                                    component={Link}
                                    to={"/login"}
                                >Login</MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={signout} >Log out</MenuItem>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
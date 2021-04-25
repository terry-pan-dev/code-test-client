import {
    makeStyles
} from '@material-ui/core'

export default makeStyles((theme) => ({
    map: {
        width: '100vw',
        height: '100vh'
    },
    searchRoot: {
        display: 'flex',
        top: '7rem',
        position: 'absolute',
        zIndex: 10,
        alignContent: 'center',
        justifyContent: 'center',
        width: '100vw'
    },
    search: {
        minWidth: '600px',
        width: '100%',
        borderRadius: '10px',
        height: '35px',
        border: 'none',
        zIndex: 10,
        backgroundColor: '#fafafad6',
        paddingLeft: '0.5em',
        fontSize: '1.2em'
    },
    option: {
        height: '35px',
        fontSize: '1.2em'
    }
}));
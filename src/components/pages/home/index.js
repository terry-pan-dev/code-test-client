import React from 'react'
import {
    Grid,
    CardMedia,
    Typography
} from '@material-ui/core'
import useStyles from './style';

export default function Home() {
    const classes = useStyles()
    const imageUrl = "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/alt-5b312c9643da2-5348-499f29dfaf551df2823bdcc6e0d08af5@1x.jpg"
    return (
        <>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <Typography variant="h3" component="h4" align="center">
                        Welcome to google place
                    </Typography>
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title="route"
                    />
                </Grid>
            </Grid>
        </>
    )
}

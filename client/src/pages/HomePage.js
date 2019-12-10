import React from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Grid, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import profileImage from '../assets/images/profile-pic-placeholder.png'

import { getData } from '../utilities/API'

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
    },
  }));

function HomePage(props) {
    const classes = useStyles()

    const redirectToTarget = (path) => {
        props.history.push(path);
    }

    let username, token
    if (window.sessionStorage.username) {
        username=window.sessionStorage.username
        token=window.sessionStorage.token
    }
    else {
        redirectToTarget('/')
    }

    const test = async () => {
        const posts = await getData('/post/search?tag=Gaming', token)
        console.log(posts)
    }
    test()

    return (
        <Container>
            <h1>Welcome to Tindigo!</h1>
            <Grid container>
                <Grid item xs={4}>
                    <Avatar
                    alt="Profile Pic Placeholder"
                    src={profileImage}
                    className={classes.avatar} />
                </Grid>

                <Grid item xs={8}>
                    <h2>{username}</h2>
                    <h3>About me</h3>
                    <p>Fugiat aute dolore dolore aliquip nulla fugiat laboris esse. Exercitation occaecat nulla fugiat magna occaecat ut sit fugiat culpa eu occaecat. Velit qui velit cupidatat anim tempor cillum aliqua ut magna velit ad. Cillum enim et deserunt nostrud ut eiusmod qui elit. Nostrud ea Lorem laborum ea amet elit minim.</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Your Posts</h1>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withRouter(HomePage);
import React from 'react';

import { Container, Grid } from '@material-ui/core';

function LandingPage(props) {

    let username
    if (window.sessionStorage.username) {
        username = window.sessionStorage.username
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h1>
                        {username ?
                        `Welcome back ${username}` :
                        'New here? Create an account!'}
                    </h1>
                </Grid>
            </Grid>
            {username ? (
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Your Posts</h1>
                    </Grid>
                    {/* map each post */}
                    <Grid item xs={12}>
                        {/* return some question component  */}
                        <h2>Question goes here?</h2>
                        <p>yes - 63%</p>
                        <p>no - 47%</p>
                    </Grid>
                </Grid> ) : ''
            }
            <Grid container>
                <Grid item xs={12}>
                    <h1>Popular Posts</h1>
                </Grid>
                {/* map each post */}
                <Grid item xs={12}>
                    {/* return some question component  */}
                    <h2>Another Question placed here?</h2>
                    <p>yes - 46%</p>
                    <p>maybe - 12%</p>
                    <p>no - 42%</p>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LandingPage;
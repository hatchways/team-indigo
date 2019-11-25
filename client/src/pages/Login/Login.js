import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Login(props) {
    const classes=useStyles()

    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Login to Tindigo!</h1>
            </Grid>
            
            <Grid container>
                <TextField
                id='user-name'
                label='User Name'
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='password'
                label='Password'
                className={classes.textField}
                margin='normal' />
            </Grid>
        </Container>
    )
}

export default Login
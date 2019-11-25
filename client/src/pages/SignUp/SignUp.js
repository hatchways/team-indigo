import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core'

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

function SignUp(props) {
    const classes = useStyles()
    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Sign up for Tindigo, and get to voting!</h1>
            </Grid>

            <Grid container>
                <TextField
                id='first-name'
                label='First Name'
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='last-name'
                label='Last Name'
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='email'
                label='Email Address'
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='about'
                label='About'
                className={classes.textField}
                margin='normal' />
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

            <Grid container>
                <TextField
                id='confirm-password'
                label='Confirm Password'
                className={classes.textField}
                margin='normal' />
            </Grid>

            

            <Grid contianer style={{marginTop: '15px'}}>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size='large' >
                    Sign Up
                </Button>
            </Grid>
        </Container>
    )
}

export default SignUp
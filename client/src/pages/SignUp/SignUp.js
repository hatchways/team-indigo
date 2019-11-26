import React, { useState } from 'react'
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

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const handleChange = event => {
        const { name, value } = event.target

        switch(name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'about':
                setAbout(value)
                break
            case 'userName':
                setUserName(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPass':
                setConfirmPass(value)
                break
            default:
        }
    }

    console.log(firstName, lastName, email, about, userName, password, confirmPass, password === confirmPass)

    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Sign up for Tindigo, and get to voting!</h1>
            </Grid>

            <Grid container>
                <TextField
                id='first-name'
                label='First Name'
                name='firstName'
                value={firstName}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='last-name'
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='email'
                label='Email Address'
                name='email'
                value={email}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='about'
                label='About'
                name='about'
                value={about}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='user-name'
                label='User Name'
                name='userName'
                value={userName}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='password'
                label='Password'
                name='password'
                value={password}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='confirm-password'
                label='Confirm Password'
                name='confirmPass'
                value={confirmPass}
                onChange={handleChange}
                className={classes.textField}
                margin='normal' />
            </Grid>

            <Grid container style={{marginTop: '15px'}}>
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
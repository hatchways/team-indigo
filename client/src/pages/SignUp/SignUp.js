import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core'

// const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        about: false,
        userName: false,
        password: false,
        confirmPass: false
    })

    const handleBlur = event => {
        const { name } = event.target
        setTouched({...touched, [name]: true})
    }
    
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

    const handleSignUp = () => {
        const data={firstName, lastName, email, about, userName, password}
        console.log(data)
    }

    const validateEmail = () => {
        const email = document.getElementById('email')
        if (email) {
            const { value } = email
            if (value) return value.match(emailRegex)
        }
        return false
    }

    const validate = () => {
        return {
            firstName: firstName.length <= 0,
            lastName: lastName.length <= 0,
            email: email.length <= 0 || ! validateEmail(),
            about: about.length <= 0,
            userName: userName.length <= 0,
            password: password.length <= 0,
            confirmPass: confirmPass.length <= 0,
            passwordMatch: password !== confirmPass
        }
    }

    const errors = validate()

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    const isDisabled = Object.keys(errors)
                             .filter(key => key !== 'about')
                             .some(key => errors[key])

    console.log(validateEmail())
    // console.log(firstName, lastName, email, about, userName, password, confirmPass, password.length > 0 && password === confirmPass)

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
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('firstName') ? 'please provide your first name' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='last-name'
                label='Last Name'
                name='lastName'
                value={lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('lastName') ? 'please provide your last name' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='email'
                label='Email Address'
                name='email'
                value={email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('email') ? 'please provide a valid email address' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='about'
                label='About'
                name='about'
                value={about}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('about') ? 'a description about you is not required' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='user-name'
                label='User Name'
                name='userName'
                value={userName}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('userName') ? 'please provide a user name' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='password'
                label='Password'
                name='password'
                value={password}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('password') ? 'please provide a password' : password !== confirmPass && touched['password'] ? 'password must match the confirm password field' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='confirm-password'
                label='Confirm Password'
                name='confirmPass'
                value={confirmPass}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('confirmPass') ? 'please confirm your password' : errors.passwordMatch && touched['confirmPass'] ? 'confirmation password must match the password field' : ''}
                margin='normal' />
            </Grid>

            <Grid container style={{marginTop: '15px'}}>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size='large'
                disabled={isDisabled}
                onClick={handleSignUp} >
                    Sign Up
                </Button>
            </Grid>
        </Container>
    )
}

export default SignUp
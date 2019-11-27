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

function Login(props) {
    const classes=useStyles()

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const [touched, setTouched] = useState({
        userName: false,
        password: false,
    })

    const handleBlur = event => {
        const { name } = event.target
        setTouched({...touched, [name]: true})
    }

    const handleChange = event => {
        const { name, value } = event.target

        switch(name) {
            case 'userName':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
        }
    }

    const handleLogin = async () => {
        const data={ userName, password }
        console.log(data)

        // curl --data "username=johnsmith123&password=yellow1235" http://localhost:3001/account/signin
        // we may want to retrieve the url as a environment variable
        try {
        const response = await fetch('http://localhost:3001/account/signin', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
          
          const result = await response.json() // parses JSON response into native JavaScript objects
          
          console.log(result)
        }
        catch(error) {
            console.log(error)
        }
        //   setToken(result)
    }

    const validate = () => {
        return {
            userName: userName.length <= 0,
            password: password.length <= 0
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

    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Login to Tindigo!</h1>
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
                helperText={shouldMarkError('password') ? 'please provide a password' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size='large'
                disabled={isDisabled}
                onClick={handleLogin} >
                    Login
                </Button>
            </Grid>
        </Container>
    )
}

export default Login
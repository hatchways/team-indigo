import React, { useState } from 'react'
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

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

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

    console.log(userName, password)

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
        </Container>
    )
}

export default Login
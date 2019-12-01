import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/user'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { postData } from '../../utilities/API'

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

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    if (user) console.log('from store:', user.username, user.token)

    const classes=useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [touched, setTouched] = useState({
        username: false,
        password: false,
    })

    const handleBlur = event => {
        const { name } = event.target
        setTouched({...touched, [name]: true})
    }

    const handleChange = event => {
        const { name, value } = event.target

        switch(name) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
        }
    }

    const handleLogin = async () => {
        const data={ username, password }
        try {
            const result = await postData('/account/signin', data)
            if (result.message === 'success') {
                dispatch(setUser(username, result.token))
            }
            else console.log(result)

        }
        catch(error) {
            console.log(error)
        }
    }

    const validate = () => {
        return {
            username: username.length <= 0,
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
                name='username'
                value={username}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('username') ? 'please provide a user name' : ''}
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

            <Link to='/account'>Account Page</Link>
        </Container>
    )
}

export default Login
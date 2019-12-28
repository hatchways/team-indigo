import './PostView.css'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Avatar, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField } from '@material-ui/core'

import SideBar from './SideBar'
import PostInfo from './PostInfo'
import PostOptions from './PostOptions'
import CommentField from './CommentField'
import VoteButton from './VoteButton'

import profileImage from '../../assets/images/profile-pic-placeholder.png'


// user data
const users=[
    { username: 'Steven Colbert',
      answer: 'League' },
    { username: 'Dana Carvey',
      answer: 'Overwatch' },
    { username: 'Liev Schreiber',
      answer: 'League' }
]

// poll tag data
const tags=[
    'Gaming',
    '2019'
]

// poll option data
const choices=[
    'League',
    'Overwatch'
]

// styling for components
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    button: {
        margin: theme.spacing(1),
    },
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
    },
    avatarSidebar: {
        margin: 10,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
  }));

const PostView = props => {
    const classes = useStyles()

    const [option, setOption] = useState('league')
    const [comment, setComment]=useState('')

    const handleChange = event => {
        const { name, value } = event.target
        console.log(name)

        if (name === 'option') setOption(value)
        if (name === 'comment') setComment(value)
    }

    const handleVote = event => {
        console.log(option)
        console.log(comment)
    }

    return (
        <Container className={classes.root} maxWidth='lg'>
            <Grid container spacing={2}>
                <SideBar
                users={users}
                profileImage={profileImage}
                classes={classes} />

                <Grid item xs={9}>
                    <PostInfo
                    classes={classes}
                    profileImage={profileImage}
                    tags={tags} />

                    <PostOptions
                    classes={classes}
                    option={option}
                    handleChange={handleChange}
                    choices={choices} />

                    <CommentField
                    classes={classes}
                    comment={comment}
                    handleChange={handleChange} />

                    <VoteButton
                    classes={classes}
                    handleVote={handleVote} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PostView
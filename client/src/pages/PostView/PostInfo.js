import React from 'react'
import { Grid, Avatar, Button } from '@material-ui/core'

const PostInfo = props => {
    return (
        <Grid container>
            <Grid item xs={7} sm={6} md={4} lg={3}>
                <Avatar
                className={props.classes.avatar}
                alt="Profile Pic Placeholder"
                src={props.profileImage} />
            </Grid>

            <Grid item xs={5} sm={6} md={8} lg={9}>
                <div id='tags'>
                    <label>Tags</label>
                    {props.tags.map(el => {
                        return (
                            <Button
                            key={el}
                            value='tag'
                            className={props.classes.button}
                            variant="contained"
                            color="primary"
                            size="medium" >
                                {el}
                            </Button>
                        )
                    })}
                </div>
                <div id='question'>
                    <h2>Which game is better?</h2>
                </div>
                <div id='description'>
                    <h3>Let's vote on which game is more popular!</h3>
                </div>
            </Grid>
        </Grid>
    )
}

export default PostInfo
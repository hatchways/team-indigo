import React from 'react'
import { Grid, TextField } from '@material-ui/core'

const CommentField = props => {
    return (
        <Grid container>
            <Grid item xs={8}>
                <TextField
                id="comment"
                name="comment"
                value={props.comment}
                onChange={props.handleChange}
                label="Write a comment"
                className={props.classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth={true} />
            </Grid>
        </Grid>
    )
}

export default CommentField
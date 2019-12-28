import React from 'react'
import { Grid, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core'

const PostOptions = props => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={props.classes.formControl}>
                    <FormLabel component="legend">
                        Voting options
                    </FormLabel>
                    <RadioGroup aria-label="voting-option" name="option" value={props.option} onChange={props.handleChange}>
                        {props.choices.map(el => {
                            const key=el.toLowerCase()
                            return (
                                <FormControlLabel
                                key={key}
                                value={key}
                                control={<Radio />}
                                label={el} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default PostOptions
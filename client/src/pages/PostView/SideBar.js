import React from 'react'
import { Grid, Avatar } from '@material-ui/core'

const SideBar = props => {
    return (
        <Grid item xs={3}>
            {props.users.map(user => {
                return (
                    <Grid container
                    key={user.username} >
                        <Grid item xs={6} sm={5} md={3}>
                            <Avatar
                            alt="Profile Pic Placeholder"
                            src={props.profileImage}
                            className={props.classes.avatarSidebar} />
                        </Grid>
                        <Grid item xs={6} sm={7} md={9}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <label>{user.username}</label>
                                </Grid>
                                <Grid item xs={12}>
                                    <label style={{fontWeight: 20}}>{user.answer}</label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default SideBar
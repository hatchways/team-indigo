import React from 'react';
import Logo from '..assets/images/Logo_house.svg'

import {AppBar, Toolbar, TextField, Avatar} from '@material-ui/core';

var headerStyle = {
    width: '100vw',
    height: '64px',
    backgroundColor: '#3399ff',
};

var toolbarStyle = {
    height: 'inherit',
    justifyContent: 'space-between'
};

var logoStyle = {
    height: 'inherit'
};

function Header({props}) {
    /*props = {
        loggedIn: true,
        userAccount: {
            username: "izy",
            avatarURL: 'https://pbs.twimg.com/profile_images/1135548833780252674/6miupkL7_400x400.jpg'
        }
    };*/
    return (
        <AppBar style={headerStyle}>
            <Toolbar style={toolbarStyle}>
                <img 
                    src={Logo} 
                    style={logoStyle} 
                    alt="https://www.flaticon.com/free-icon/house_126496?term=logo&page=1&position=64"/>
                <TextField variant="filled" label="Search Tindigo"/>

                <Toolbar>
                    {
                        props && props.loggedIn ? (
                            <>
                                <Avatar alt="User Avatar" src={props.userAccount.avatarURL}/>
                                <span> {props.userAccount.username} </span>
                            </>
                        ) : (
                            <span>
                                Not logged in
                            </span>
                        )
                    }
                    
                </Toolbar>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
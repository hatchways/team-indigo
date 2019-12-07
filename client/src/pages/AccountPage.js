import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getData } from '../utilities/API'

import {Avatar} from '@material-ui/core';

var mainGridStyle = {
    display: 'grid',
    fontFamily: 'Roboto',
    paddingTop: '5vh',
    paddingLeft: '2vw'
};

var userInformationStyle = {
    display: 'flex',
    marginBottom: '20vh'
};

var avatarStyle = {
    width: '200px',
    height: '200px',
    marginLeft: '15vw',
    marginRight: '5vw'
};

var userBioStyle = {
    display: 'grid'
};

var nameStyle = {
    fontWeight: 'Bold',
    fontSize: 'xx-large'
};

var userNameStyle = {
    fontSize: 'x-large'
};

function UserPosts() {
    return <div></div>;
}

function AccountPage(props) {

    const state = useSelector(state => state)
    let username, token
    if (state.user) {
        username = state.user.username
        token = state.user.token
    }

    const getUserInfo = async username => {
        const url = `/account/u/${username}`
        const data = await getData(url, token)
        console.log(data)
    }

    if(username) getUserInfo(username)
    
    return (
        <>
            <div style={{height: '64px'}}></div>
            <div style={mainGridStyle}>
                <div style={userInformationStyle} className="userInformation">
                    <Avatar style={avatarStyle}/>
                    <div style={userBioStyle}>
                        <span style={nameStyle}>(First Last)</span>
                        <span style={userNameStyle}>{ username ? username : '(@username)' }</span>
                        <span style={{fontWeight: 'bold'}}>About Me</span>
                        <span>I am a really cool person.</span>
                    </div>
                </div>
                <div className="userPosts">
                    <span>Posts by (Name)</span>
                    <UserPosts />
                </div>
            </div>
            <Link to='/'>Home</Link>
        </>
    );
}

export default AccountPage;
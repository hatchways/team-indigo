import React from 'react';
import Header from '../components/Header';

function UserPosts() {
    return <div></div>;
}

function PopularPosts() {
    return <div></div>;
}

var mainGridStyle = {
    'display': 'grid',
    'fontFamily': 'Roboto',
    'paddingTop': '5vh',
    'paddingLeft': '2vw'
};

var welcomeMessageStyle = {
    'fontSize': 'xx-large',
    'marginBottom': '5vh'
};

var postsMessageStyle = {
    'fontSize': 'large'
};

function HomePage({props}) {
    return (
        <>
            <Header />
            <div style={{height: '64px'}}></div>
            <div style={mainGridStyle}>
                <span style={welcomeMessageStyle}>
                    {
                        props && props.loggedIn
                            ? `Welcome Back`
                            : `New here? Create an Account`
                    }
                </span>
                {
                    props && props.loggedIn
                    ?   <>
                            <span style={postsMessageStyle}>Your Posts</span>
                            <UserPosts />
                        </>
                    :   <span style={postsMessageStyle}>You have no Posts</span>
                }
                <span style={postsMessageStyle}>Popular Posts</span>
                <PopularPosts />
            </div>
        </>
    );
}

export default HomePage;
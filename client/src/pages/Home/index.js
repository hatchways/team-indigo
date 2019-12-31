import './Home.css'

import React from 'react';
import { Link } from 'react-router-dom'

import { Container, Grid } from '@material-ui/core';

import { getData } from '../../utilities/API'

function Home(props) {

    let username, token
    if (window.sessionStorage.username) {
        username = window.sessionStorage.username
        token = window.sessionStorage.token
    }

    const getPosts = async () => {
        const response = await getData(`/account/u/${username}`, token)
        console.log(response)

        const postIds = response.data.posts
        // create an array of promises
        const promises = []

        for (let i=0; i < postIds.length; i++) {
            const id = postIds[i]
            promises.push(
                getData(`post/id/${id}`, token)
            )
        }

        const responses = await Promise.all(promises)
        console.log(responses)
    }

    let posts
    if (username) {
        posts = getPosts()
    }

    if(posts) console.log(posts)

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h1>
                        {username ?
                        `Welcome back ${username}` :
                        (<>New Here? <Link id='new-person-link' to='/signup'>Create an account!</Link></>)}
                    </h1>
                </Grid>
            </Grid>
            {username ? (
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Your Posts</h1>
                    </Grid>
                
                    {/* {posts.map(post => {
                        return (
                            <Grid item xs={12}>
                                <h2>{post.question}</h2>

                                {post.choices.map(choice => {
                                    return <p>{choice}</p>
                                })}

                            </Grid>
                        )}
                    )}*/}
                </Grid> ) : '' 
            }
            
            <Grid container>
                <Grid item xs={12}>
                    <h1>Popular Posts</h1>
                </Grid>
                {/* map each post */}
                <Grid item xs={12}>
                    {/* return some question component  */}
                    <h2>Another Question placed here?</h2>
                    <p>yes - 46%</p>
                    <p>maybe - 12%</p>
                    <p>no - 42%</p>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;
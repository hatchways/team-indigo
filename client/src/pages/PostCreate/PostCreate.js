import './PostCreate.css'
import React from 'react'
// import { Container } from '@material-ui/core'

const PostCreate = () => {
    return (
        <section className='post-create'>
            <h1>Create Post</h1>
            <section className='field'>
                <label>Visibility:</label>
                <input />
            </section>
            <section className='field'>
                <label>Tags:</label>
                <section>
                    <input />
                    <button>Add tag</button>
                    <section className='tags'>
                        <button>Gaming</button>
                        <button>2019</button>
                    </section>
                </section>
            </section>
            <section className='field'>
                <label>Question:</label>
                <input />
            </section>
            <section id='description'>
                <label>Description (100 characters or less)</label>
                <textarea />
            </section>
            <section className='field'>
                <label>Voting Options:</label>
                <section>
                    <input />
                    <button>Add option</button>
                    <section className='tags'>
                        <button>League</button>
                        <button>Overwatch</button>
                    </section>
                </section>
            </section>
            <button id='btn-post'>Post</button>
        </section>
    )
}

export default PostCreate
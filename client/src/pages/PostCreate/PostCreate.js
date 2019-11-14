import './PostCreate.css'
import React, { useState } from 'react'
// import { Container } from '@material-ui/core'

const PostCreate = () => {
    const [tag, setTag] = useState('')
    const [option, setOption] = useState('')

    function handleClick(event) {
        const target=event.target
        const text=target.textContent
        const ref=text.split(' ')[1]
        const inputTarget=document.getElementById(`${ref}-input`)
        const appendTarget=document.getElementById(`${ref}s`)
        const { value } = inputTarget
        const element=document.createElement('button')
        element.textContent=value
        appendTarget.appendChild(element)
    }

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
                    <input id='tag-input'
                    onChange={event => { setTag(event.target.value) }}
                    value={tag} />
                    <button onClick={handleClick} >Add tag</button>
                    <section id='tags'>
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
                    <input id='option-input'
                    onChange={event => { setOption(event.target.value) }}
                    value={option} />
                    <button onClick={handleClick} >Add option</button>
                    <section id='options'>
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
import './PostCreate.css'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Menu, MenuItem, Button } from '@material-ui/core'
// import { Menu, MenuItem } from '@material-ui/core/Menu'

const visibilityOptions = [
    {
      value: 'public',
      label: 'Public',
    },
    {
      value: 'group-only',
      label: 'Group only',
    }
  ];
  
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    menu: {
      width: 200,
    },
}));

const PostCreate = props => {
    const classes = useStyles();

    // const [tag, setTag] = useState('')
    // const [option, setOption] = useState('')

    const [visibility, setVisibility] = React.useState('EUR');

    const handleChange = event => {
        setVisibility(event.target.value);
    };

    return (
        <form className={classes.container} noValidate autoComplete='off'>
            <div>
                <TextField
                id="select-visibility"
                select
                label="Select Visibility"
                className={classes.textField}
                value={visibility}
                onChange={handleChange}
                SelectProps={{
                    MenuProps: {
                    className: classes.menu,
                    },
                }}
                // helperText="Please select your currency"
                margin="normal"
                >
                {visibilityOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </div>
            <div>
                <TextField >
                </TextField>
            </div>
        </form>
    )
    // function handleClick(event) {
    //     const target=event.target
    //     const text=target.textContent
    //     const ref=text.split(' ')[1]
    //     const inputTarget=document.getElementById(`${ref}-input`)
    //     const appendTarget=document.getElementById(`${ref}s`)
    //     const { value } = inputTarget
    //     const element=document.createElement('button')
    //     element.textContent=value
    //     appendTarget.appendChild(element)
    // }

    // return (
    //     <section className='post-create'>
    //         <h1>Create Post</h1>
    //         <section className='field'>
    //             <label>Visibility:</label>
    //             <input />
    //         </section>
    //         <section className='field'>
    //             <label>Tags:</label>
    //             <section>
    //                 <input id='tag-input'
    //                 onChange={event => { setTag(event.target.value) }}
    //                 value={tag} />
    //                 <button onClick={handleClick} >Add tag</button>
    //                 <section id='tags'>
    //                     <button>Gaming</button>
    //                     <button>2019</button>
    //                 </section>
    //             </section>
    //         </section>
    //         <section className='field'>
    //             <label>Question:</label>
    //             <input />
    //         </section>
    //         <section id='description'>
    //             <label>Description (100 characters or less)</label>
    //             <textarea />
    //         </section>
    //         <section className='field'>
    //             <label>Voting Options:</label>
    //             <section>
    //                 <input id='option-input'
    //                 onChange={event => { setOption(event.target.value) }}
    //                 value={option} />
    //                 <button onClick={handleClick} >Add option</button>
    //                 <section id='options'>
    //                     <button>League</button>
    //                     <button>Overwatch</button>
    //                 </section>
    //             </section>
    //         </section>
    //         <button id='btn-post'>Post</button>
    //     </section>
    // )
}

export default PostCreate
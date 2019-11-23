import './PostCreate.css'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, MenuItem, Button, Icon } from '@material-ui/core'

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
      width: 300,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const PostCreate = props => {
    const classes = useStyles();

    const [visibility, setVisibility] = React.useState('');
    const [tags, setTags] = useState([])
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([])

    const [touched, setTouched] = useState({
        visibility: false,
        tags: false,
        question: false,
        description: false,
        options: false
    })

    const messages = {
        visibility: "Please select a visibility option",
        tags: 'Please provide at least one tag',
        question: 'Please provide a question for your poll',
        description: 'A description is not required, but it may help',
        options: 'Please provide at least two voting options'
    }

    const handleChange = event => {
        setVisibility(event.target.value);
    };

    const handleAdd = event => {
        const ref=event.target.textContent.split(' ')[1]
        const input=document.getElementById(`${ref}-input`)
        const { value }=input
        if (ref === 'tag') setTags([...tags, value])
        if (ref === 'option') setOptions([...options, value])
        input.value=''
    }

    const handleClose = event => {
        let target=event.target
        let ref=target.textContent.substring(5)
        let { value } = target

        if (! value) {
            target = target.parentElement
            value = target.value

            if (! value) {
                target = target.parentElement.parentElement
                ref=target.textContent.substring(5)
                value = target.value
            }
        }
        
        if (value === 'tag') {
            const index=tags.indexOf(ref)
            tags.splice(index, 1)
            setTags([...tags])
        } else if (value === 'option') {
            const index=options.indexOf(ref)
            options.splice(index, 1)
            setOptions([...options])
        }
    }

    const handlePost = () => {
        const post={visibility, tags, question, description, options}
        console.log(post)
    }

    const validate = () => {
        return {
            visibility: visibility.length <= 0,
            tags: tags.length <= 0,
            description: description.length <= 0,
            question: question.length <= 0,
            options: options.length <= 1
        }
    }

    const errors = validate()

    const isDisabled = Object.keys(errors)
                             .filter(key => key !== 'description')
                             .some(key => errors[key])

    const handleBlur = field => event => {
        setTouched({...touched, [field]: true})
    }

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    return (
        <Container maxWidth='sm'>
            <h1>Create a Poll</h1>
            <form className={classes.container} noValidate autoComplete='off'>
                <div>
                    <TextField
                    id="select-visibility"
                    select
                    label="Select Poll Visibility"
                    className={classes.textField}
                    value={visibility}
                    onChange={handleChange}
                    onBlur={handleBlur('visibility')}
                    helperText={shouldMarkError('visibility') ? messages.visibility : '' }
                    margin="normal"
                    SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    >
                    {visibilityOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                <div className='field'>
                    <TextField
                    id="tag-input"
                    className={classes.textField}
                    label="Tags"
                    onBlur={handleBlur('tags')}
                    helperText={shouldMarkError('tags') ? messages.tags : ''}
                    margin="normal" />
                    <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAdd} >
                        Add tag
                    </Button>
                </div>
                <div id='tags'>
                    {tags.map(el => {
                        return (
                            <Button
                            key={el}
                            value='tag'
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<Icon>close</Icon>}
                            size="medium"
                            onClick={handleClose} >
                                {el}
                            </Button>
                        )
                    })}
                </div>
                <div className='field'>
                    <TextField
                    id="question"
                    className={classes.textField}
                    label="Question"
                    onBlur={handleBlur('question')}
                    helperText={shouldMarkError('question') ? messages.question : ''}
                    margin="normal"
                    onChange={event => { setQuestion(event.target.value) }}
                    value={question} />
                </div>
                <div className='field'>
                    <TextField
                    id="description"
                    className={classes.textField}
                    label="Description"
                    onBlur={handleBlur('description')}
                    helperText={shouldMarkError('description') ? messages.description : ''}
                    margin="normal"
                    onChange={event => { setDescription(event.target.value) }}
                    value={description} />
                </div>
                <div className='field'>
                    <TextField
                    id="option-input"
                    className={classes.textField}
                    label="Voting Option"
                    onBlur={handleBlur('options')}
                    helperText={shouldMarkError('options') ? messages.options : ''}
                    margin="normal" />
                    <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAdd} >
                        Add option
                    </Button>
                </div>
                <div id='options'>
                {options.map(el => {
                        return (
                            <Button
                            key={el}
                            value='option'
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<Icon>close</Icon>}
                            size="medium"
                            onClick={handleClose} >
                                {el}
                            </Button>
                        )
                    })}
                </div>
                <div>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                size='large'
                onClick={handlePost}
                disabled={ isDisabled }>
                    Post
                </Button>
                </div>
            </form>
        </Container>
    )
}

export default PostCreate
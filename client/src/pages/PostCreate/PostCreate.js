import './PostCreate.css'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'

import VisibilityField from './Fields/Visibility';
import TagsField from './Fields/Tags'
import QuestionField from './Fields/Question';
import DescriptionField from './Fields/Description';
import VotingOptionsField from './Fields/VotingOptions';
import ButtonCreatePost from './ButtonCreatePost';

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

    const handleAdd = event => {
        const ref=event.target.textContent.split(' ')[1]
        const input=document.getElementById(`${ref}-input`)
        const { value }=input
        if (ref === 'tag') setTags([...tags, value])
        if (ref === 'option') setOptions([...options, value])
        input.value=''
    }

    const handleBlur = field => event => {
        setTouched({...touched, [field]: true})
    }

    const handleRemove = event => {
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

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    return (
        <Container maxWidth='sm'>
            <h1>Create a Poll</h1>
            <form className={classes.container} noValidate autoComplete='off'>
                
                <VisibilityField
                classes={classes}
                visibility={visibility}
                setVisibility={setVisibility}
                visibilityOptions={visibilityOptions}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <TagsField
                classes={classes}
                tags={tags}
                handleAdd={handleAdd}
                handleBlur={handleBlur}
                handleRemove={handleRemove}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <QuestionField
                classes={classes}
                question={question}
                setQuestion={setQuestion}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <DescriptionField
                classes={classes}
                description={description}
                setDescription={setDescription}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <VotingOptionsField
                classes={classes}
                options={options}
                setOptions={setOptions}
                handleAdd={handleAdd}
                handleBlur={handleBlur}
                handleRemove={handleRemove}
                shouldMarkError={shouldMarkError}
                messages={messages} />
                
                <ButtonCreatePost
                classes={classes}
                handlePost={handlePost}
                errors={errors} />
            </form>
        </Container>
    )
}

export default PostCreate
import React from 'react'
import { Button, Icon } from '@material-ui/core'

function ButtonCreatePost(props) {
    return (
        <div>
            <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
            endIcon={<Icon>send</Icon>}
            size='large'
            onClick={props.handlePost}
            disabled={ props.isDisabled }>
                Post
            </Button>
        </div>
    )
}

export default ButtonCreatePost
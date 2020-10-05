import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onAddItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.target.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && onAddItem()
    }

    return (
        <div>
            <TextField
                error={!!error}
                variant={'filled'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={onAddItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm
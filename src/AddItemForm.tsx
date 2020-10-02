import React, {ChangeEvent, useState} from "react";
import {Button} from "@material-ui/core";
import {TextFields} from "@material-ui/icons";

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
            <div className={'inbuer'}>
                <TextFields
                    variant={''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <Button variant='contained'
                        color='primary'
                        onClick={onAddItem}>+</Button>
            </div>
            <div>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        </div>
    )
}

export default AddItemForm
import React, {ChangeEvent, useState} from "react";

type EditedSpanPropsType = {
    value: string
    changeTitle: (title: string) => void
}

export function EditedSpan(props: EditedSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    let [error, setError] = useState<string | null>(null)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        if (title.trim() !== '') {
            setEditMode(false)
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
        props.changeTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && activateViewMode()
    }
    return editMode
        ? <div>
            <input
                value={props.value}
                autoFocus onBlur={activateViewMode}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                className={error ? 'error' : ''}
            />
            <div>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        </div>
        : <span onClick={activateEditMode}>{props.value}</span>
}
import React, {ChangeEvent, useState} from "react";

type EditedSpanPropsType = {
    value: string
    changeTitle: (title: string) => void
}

export function EditedSpan(props: EditedSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        // props.changeTitle(title)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        props.changeTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && activateViewMode()
    }
    return editMode
        ? <input
            value={props.value}
            autoFocus onBlur={activateViewMode}
            onKeyPress={onKeyPressHandler}
            onChange={onChangeHandler}
        />
        : <span onClick={activateEditMode}>{props.value}</span>
}
import React, {ChangeEvent, useState} from "react";

type ValueType = {
    value: string
}

export function EditedSpan(props: ValueType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    const activateEditMode = () => {
        setEditMode(true)
        // setTitle(props.value) ???
    }
    const activateViewMode = () => setEditMode(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    return editMode
        ? <input value={title}
                 autoFocus onBlur={activateViewMode}
                 onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}
import React, {useState} from "react";

type ValueType = {
    value: string
}

export function EditedSpan(props: ValueType) {

    let [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => setEditMode(false)

    return editMode
        ? <input
            value={props.value}
            autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

}
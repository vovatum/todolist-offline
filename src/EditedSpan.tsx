import React, {useState} from "react";

type ValueType = {
    value: string
}

export function EditedSpan(props: ValueType) {

    let [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(true)

    return editMode
        ? <input value={props.value}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

}
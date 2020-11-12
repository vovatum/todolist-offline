import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditedSpan} from "./EditedSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: () => void
    changeStatus: (event: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (title: string) => void
}

export function Task(props: TaskPropsType & TaskType) {


    return <div key={props.id}
                className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={props.isDone}
            onChange={props.changeStatus}
        />
        <EditedSpan value={props.title}
                    changeTitle={props.changeTaskTitle}
        />
        <IconButton onClick={props.removeTask}>
            <Delete/>
        </IconButton>
    </div>
}
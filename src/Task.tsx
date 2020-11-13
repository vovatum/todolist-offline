import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditedSpan} from "./EditedSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")

    const onClickHandler = () => props.removeTask(props.taskId, props.todolistId)
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.taskId, event.target.checked, props.todolistId)
    }, [props.taskId, props.todolistId, props.changeTaskStatus])
    const onChangeTaskTitle = useCallback(() => {
        props.changeTaskTitle(props.taskId, props.title, props.todolistId)
    }, [props.changeTaskTitle, props.taskId, props.title, props.todolistId])

    return <div key={props.taskId}
                className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={props.isDone}
            onChange={onChangeHandler}
        />
        <EditedSpan value={props.title}
                    changeTitle={onChangeTaskTitle}
        />
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
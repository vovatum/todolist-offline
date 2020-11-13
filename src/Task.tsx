import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditedSpan} from "./EditedSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    tasks: Array<TaskType>
    id: string
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void

}

export function Task(props: TaskPropsType) {
    console.log("Task called")

    props.tasks.map(task => {

        const onClickHandler = () => props.removeTask(task.id, props.id)
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, event.target.checked, props.id)
        }
        const onChangeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }

        return <div key={task.id}
                    className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditedSpan value={task.title}
                        changeTitle={onChangeTaskTitle}
            />
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    })
}
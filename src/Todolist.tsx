import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditedSpan} from "./EditedSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    filter: string
    id: string
}

export function Todolist(props: PropsType) {

    const onAddTask = (title: string) => props.addTask(title, props.id)
    const onRemoveTask = () => props.changeFilter('active', props.id)
    const onRemoveTodolist = () => props.removeTodolist(props.id)
    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div>
                <h3>
                    <EditedSpan value={props.title}
                                changeTitle={onChangeTodolistTitle}
                    />
                    <IconButton onClick={onRemoveTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={onAddTask}/>
            <ul>
                {
                    props.tasks && props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, event.target.checked, props.id)
                        }
                        const onChangeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return <li key={task.id}
                                   className={task.isDone ? 'is-done' : ''}>
                            <Checkbox
                                color={"primary"}
                                checked={task.isDone}
                                onChange={onChangeHandler}/>
                            <EditedSpan value={task.title}
                                        changeTitle={onChangeTaskTitle}
                            />
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                    color={"secondary"}
                    variant={"outlined"}
                >All
                </Button>
                <Button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onRemoveTask}>Active
                </Button>
                <Button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

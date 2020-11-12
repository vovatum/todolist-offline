import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
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
    changeTodolistTitle: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    filter: string
    id: string
}

export const Todolist = React.memo(function (props: PropsType) {
        console.log("Todolist called")
        const onAddTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])
        const onRemoveTask = () => props.changeFilter('active', props.id)
        const onRemoveTodolist = () => props.removeTodolist(props.id)
        const onChangeTodolistTitle = (title: string) => {
            props.changeTodolistTitle(title, props.id)
        }
        const onAllClickHandler = () => props.changeFilter('all', props.id)
        const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
        let tasksForTodolist = props.tasks
        props.filter === 'active'
            ? tasksForTodolist = props.tasks.filter(task => !task.isDone)
            : props.filter === 'completed'
            ? tasksForTodolist = props.tasks.filter(task => task.isDone)
            : tasksForTodolist = props.tasks
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
                <div>
                    {
                        tasksForTodolist.map(task => {
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
                </div>
                <div>
                    <Button
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={"default"}
                    >All
                    </Button>
                    <Button
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onRemoveTask}
                        color={"primary"}
                    >Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}
                    >Completed
                    </Button>
                </div>
            </div>
        )
    }
)

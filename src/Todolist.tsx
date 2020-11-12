import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditedSpan} from "./EditedSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
        console.log(props)
        const onAddTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])
        const onRemoveTodolist = () => props.removeTodolist(props.id)
        const onChangeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(title, props.id)
        },[props.id])
        const onActiveClickHandler = useCallback(() => {
            props.changeFilter('active', props.id)
        }, [props.id])
        const onAllClickHandler = useCallback(() => {
            props.changeFilter('all', props.id)
        }, [props.id])
        const onCompletedClickHandler = useCallback(() => {
            props.changeFilter('completed', props.id)
        }, [props.id])

        let tasksForTodolist: Array<TaskType>
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
                            return <Task
                                id={task.id}
                                title={task.title}
                                isDone={task.isDone}
                                removeTask={onClickHandler}
                                changeStatus={onChangeHandler}
                                changeTaskTitle={onChangeTaskTitle}
                            />
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
                        onClick={onActiveClickHandler}
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

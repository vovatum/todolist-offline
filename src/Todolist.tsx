import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditedSpan} from "./EditedSpan";

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
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
}

export function Todolist(props: PropsType) {

    const onAddTask = (title: string) => props.addTask(title, props.id)
    const onRemoveTask = () => props.changeFilter('active', props.id)
    const onRemoveTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={onRemoveTodolist}>-</button>
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
                        return <li key={task.id}
                                   className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <EditedSpan value={task.title}/>
                            <button onClick={onClickHandler}
                            >х
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onRemoveTask}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

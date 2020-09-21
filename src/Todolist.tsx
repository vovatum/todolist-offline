import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (taskName: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onAddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.target.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {

        event.key === 'Enter' && onAddTask()
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const onRemoveTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={onRemoveTodolist}>-</button>
                </h3>
            </div>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={onAddTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, event.target.checked, props.id)
                        }
                        return <li key={task.id}
                                   className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{task.title}</span>
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
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskName: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onKeyPressHandler = (event:  React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTask()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>
                    +
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone}
                        />
                        {task.title}
                        <button onClick={() => {
                            props.removeTask(task.id)
                        }}>х
                        </button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>
                    All
                </button>
                <button onClick={() => props.changeFilter('active')}>
                    Active
                </button>
                <button onClick={() => props.changeFilter('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}
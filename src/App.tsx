import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist: any

    function removeTask(taskId: string) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function addTask(taskName: string) {
        let newTask = {id: v1(), title: taskName, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    //map variant
    // function changeStatus(id: string, isDone: boolean) {
    //     let newTasks = tasks.map(task => {
    //         if (task.id === id) {
    //             return {...task, isDone: isDone}
    //         } else return task
    //     })
    //     setTasks(newTasks)
    // }

    filter === 'active'
        ? tasksForTodolist = tasks.filter(task => !task.isDone)
        : filter === 'completed'
        ? tasksForTodolist = tasks.filter(task => task.isDone)
        : tasksForTodolist = tasks

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    )
}

export default App

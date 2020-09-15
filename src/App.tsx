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

    function removeTask(taskId: string) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist: any

    filter === 'active'
        ? tasksForTodolist = tasks.filter(task => !task.isDone)
        : filter === 'completed'
        ? tasksForTodolist = tasks.filter(task => task.isDone)
        : tasksForTodolist = tasks

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(taskName: string) {
        let newTask = {id: v1(), title: taskName, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    )
}

export default App

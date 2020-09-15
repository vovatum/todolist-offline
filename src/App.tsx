import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: true},
        {id: 5, title: 'GraphQL', isDone: true}
    ])

    function removeTask(id: number) {
        setTasks(tasks.filter(task => task.id != id))
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist: any

    filter === 'active'
        ? tasksForTodolist = tasks.filter(task => !task.isDone)
        : filter === 'completed'
        ? tasksForTodolist = tasks.filter(task => task.isDone)
        : tasksForTodolist = tasks

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App

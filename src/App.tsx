import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: true}
    ]

    const tasks2 = [
        {id: 1, title: 'Song1', isDone: true},
        {id: 2, title: 'Song2', isDone: true},
        {id: 3, title: 'Song3', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Songs' tasks={tasks2}/>
        </div>
    )
}

export default App

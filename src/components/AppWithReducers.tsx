import React, {useReducer, useState} from 'react';
import '../App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography
} from "@material-ui/core";
import {MenuOpen} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolist1 = v1()
    let todolist2 = v1()
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolist1, title: 'What to learn', filter: 'all'},
    //     {id: todolist2, title: 'What to buy', filter: 'all'}
    // ])
    // let [tasks, setTasks] = useState<TaskStateType>({
    //     [todolist1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: true}
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: 'Tea', isDone: true},
    //         {id: v1(), title: 'Chocolate', isDone: true},
    //     ]
    // })
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: true}
        ],
        [todolist2]: [
            {id: v1(), title: 'Tea', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: true},
        ]
    })

    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTasks(action)
        dispatchToTodolists(action)    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }
    function changeTodolistTitle(title: string, todolistId: string) {
        const action = ChangeTodolistTitleAC(title, todolistId)
        dispatchToTodolists(action)
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatchToTodolists(action)
    }
    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasks(action)
    }
    function addTask(taskName: string, todolistId: string) {
        const action = addTaskAC(taskName, todolistId)
        dispatchToTasks(action)
    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(id, title, todolistId)
        dispatchToTasks(action)
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                        // className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuOpen/>
                    </IconButton>
                    <Typography variant="h6"
                        // className={classes.title}
                    >
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let allTodolistTasks = tasks[todolist.id], tasksForTodolist
                            todolist.filter === 'active'
                                ? tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                                : todolist.filter === 'completed'
                                ? tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                                : tasksForTodolist = allTodolistTasks

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers

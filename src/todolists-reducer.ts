import {FilterValuesType, TodolistType} from "./App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType
    id: string
}
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(todolist => todolist.id !== action.id)]
        case 'ADD-TODOLIST':
            let todolistId3 = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, todolistId3]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(todolist => {
                if (todolist.id === action.id) {
                    return {
                        ...todolist,
                        title: action.title
                    }
                } else return todolist
            })]
        // let newState = [...state]
        // let todolist = newState.find(todolist => todolist.id === action.id)
        // if (todolist) {
        //     todolist.title = action.title
        // }
        // return newState
        case 'CHANGE-TODOLIST-FILTER':
            let newState = [...state]
            let todolist = newState.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}

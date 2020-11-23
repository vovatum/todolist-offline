import {FilterValuesType, TodolistType} from "../components/App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
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

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => {
                if (todolist.id === action.id) {
                    return {
                        ...todolist,
                        title: action.title
                    }
                } else return todolist
            })
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]   //как в копии стейта изменился фильтр
        default:
            return state
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}

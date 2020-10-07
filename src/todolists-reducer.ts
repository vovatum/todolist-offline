import {TodolistType} from "./App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

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
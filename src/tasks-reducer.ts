import {TaskStateType} from './App';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    debugger
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId],
                    {id: "4", title: action.title, isDone: false}]
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'Task Stories',
    component: Task
}

const removeCallback = action('Remove Button inside Task clicked')
const changeStatusCallback = action('Status change inside Task')
const changeTitleCallback = action('Title change inside Task')

export const TaskBaseExample = (props: any) => {
    return <div>
        <Task
            taskId={'1'}
            isDone={true}
            title={'CSS'}
            removeTask={removeCallback}
            changeTaskTitle={changeTitleCallback}
            changeTaskStatus={changeStatusCallback}
            todolistId={'todolistId1'}
        />
        <Task
            taskId={'1'}
            isDone={false}
            title={'JS'}
            removeTask={removeCallback}
            changeTaskTitle={changeTitleCallback}
            changeTaskStatus={changeStatusCallback}
            todolistId={'todolistId2'}
        />
    </div>
}
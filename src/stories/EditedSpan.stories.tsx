import React from "react";
import {action} from "@storybook/addon-actions";
import {EditedSpan} from "../components/EditedSpan";


export default {
    title: 'EditableSpan Stories',
    component: EditedSpan
}

export const EditableSpanFormBaseExample = (props: any) => {
    return (<EditedSpan
        value={'StartValue'}
        changeTitle={action('value changed')}
    />)
}
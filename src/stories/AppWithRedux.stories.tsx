import React from "react";
import AppWithRedux from "../components/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return (<AppWithRedux/>)
}
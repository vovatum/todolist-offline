import {Provider} from "react-redux";
import {store} from "../state/store";
import React from "react";

export const ReduxStoreProviderDecorator=(storyFn:any)=>(
    <Provider
        store={store}>{storyFn()}
    </Provider>)
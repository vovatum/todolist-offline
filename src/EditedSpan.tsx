import React from "react";

type ValueType = {
    value: string
}

export function EditedSpan(props: ValueType) {
    return <span>{props.value}</span>
}
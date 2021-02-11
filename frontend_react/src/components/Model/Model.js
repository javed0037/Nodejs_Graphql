import React from 'react';
import './Model.css'


const model = props =>(
    <div className = "model">
        <header className = "model-header"><h1>{props.title}</h1></header>
        <section className = "model-content"></section>
        {props.children}
        <section className = "model-action"></section>
        {props.Confirm && (<button className = "btn" onClick = {props.onCancel}>Cancel</button>)}
        {props.Cancel &&  (<button className = "btn" onClick = {props.onConfirm}>{props.ConfirmText}</button>)}
    </div>
)

export default model;
import React from 'react'
import firebase from "./firebase";
import {Button , Input , Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Task = ({taskdata}) => {

    const [task , settask] = React.useState(taskdata.task);
    
    const deletetask = () => {
        const db = firebase.firestore();
        db.collection('tasks').doc(taskdata.id).delete();
        
    }

    const updatetask = ()=> {
        const db = firebase.firestore();
        db.collection('tasks').doc(taskdata.id).update({
            task : task
        });

    }
    return (
        <div className = 'task'>
           
            <Input multiline = {true} disableUnderline = {true} value = {taskdata.task} onChange = {(e) => {settask(e.target.value)}} value = {task}/>
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} variant = 'contained'>
                <CheckIcon/>
            </Button>
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} variant = 'contained' color = 'secondary' onClick = {deletetask}>X</Button>
            <Button  variant = 'outlined' onClick = {updatetask}>Update</Button>
            
        </div>
    )
}

export default Task

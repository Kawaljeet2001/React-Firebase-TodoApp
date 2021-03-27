import React from 'react'
import firebase from "./firebase";
import { Button, Tooltip, Container, Input, Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Task = ({ taskdata }) => {

    const [task, settask] = React.useState(taskdata.task);

    const deletetask = () => {
        const db = firebase.firestore();
        db.collection('tasks').doc(taskdata.id).delete();

    }

    const updatetask = () => {
        const db = firebase.firestore();
        db.collection('tasks').doc(taskdata.id).update({
            task: task
        });

    }
    return (
        <div className='task'>
            <Container maxWidth = 'sm' style = {{'display' : 'flex', 'justify-content' : 'space-evenly', 'align-items' : 'center', 'border-bottom' : '1px solid #ddd'}}>
                <Input multiline={true} disableUnderline={true} value={taskdata.task} onChange={(e) => { settask(e.target.value) }} value={task} />
                <Tooltip title = 'complete'>
                <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant='contained'>
                    <CheckIcon />
                </Button>
                </Tooltip>
                <Tooltip title = 'Delete'>
                    <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant='contained' color='secondary' onClick={deletetask}>X</Button>
                </Tooltip>
                <Tooltip title = 'Update Task'>
                    <Button variant='outlined' onClick={updatetask}>Update</Button>
                </Tooltip>
            </Container>
        </div>
    )
}

export default Task

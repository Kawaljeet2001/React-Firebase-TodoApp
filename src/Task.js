import React from 'react'
import firebase from "./firebase";
import { Button, Tooltip, Container, Input, Checkbox } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import UpdateIcon from '@material-ui/icons/Update';

const Task = ({ taskdata }) => {

    const ref = React.useRef(null);

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

    const taskcompleted = () => {
        
        const db = firebase.firestore();
        if(taskdata.iscompleted)
        {
            db.collection('tasks').doc(taskdata.id).update({
                iscompleted: false
            });

            ref.current.style.textDecoration = '';
            ref.current.style.opacity = '1'
        }

        else{
            db.collection('tasks').doc(taskdata.id).update({
                iscompleted: true
            });
            ref.current.style.textDecoration = 'line-through'
            ref.current.style.opacity = '0.4'
        }
       

    }

    React.useEffect( () => {
        if(taskdata.iscompleted)
        {
            ref.current.style.textDecoration = 'line-through'
            ref.current.style.opacity = '0.4'
        }

        else
        {
            ref.current.style.textDecoration = '';
            ref.current.style.opacity = '1'
        }
    }, [])
    return (
        <>
            <Container className = 'task'>
                <Input ref = {ref} className = 'task-field' multiline={true} disableUnderline={true} value={taskdata.task} onChange={(e) => { settask(e.target.value) }} value={task} />
                <Tooltip className = 'tooltip' title = 'complete'>
                    <Button onClick = {taskcompleted} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant='contained'>
                        <CheckIcon />
                    </Button>
                </Tooltip>
                <Tooltip className = 'tooltip' title = 'Delete'>
                    <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant='contained' color='secondary' onClick={deletetask}>X</Button>
                </Tooltip>
                <Tooltip className = 'tooltip' title = 'Update Task'>
                    <Button variant='outlined' onClick={updatetask} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}>
                        <UpdateIcon/>
                    </Button>
                </Tooltip>
            </Container>
        </>
    )
}

export default Task

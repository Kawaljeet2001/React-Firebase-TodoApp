import React from 'react'
import firebase from "./firebase";
import { Paper, Tooltip, Container , Input , Button } from '@material-ui/core';
const CreateTask = ({toggle}) => {
    const [newtask, setnewtask] = React.useState("");
    const createTask = () => {

        const db = firebase.firestore();
        db.collection('tasks').add({ task: newtask, iscompleted: false });
        setnewtask("");
      }
    
    return (
        <>
        <Container className = 'add-task'>
          <Input required={true} placeholder="Create a task" value={newtask} onChange={(e) => setnewtask(e.target.value)} />
          <Tooltip title="Add Task">
            <Button variant='contained' onClick={createTask} color = 'primary' style = {{background: '#38b000'}}>Add Task</Button>
          </Tooltip>
        </Container>
        </>
    )
}

export default CreateTask

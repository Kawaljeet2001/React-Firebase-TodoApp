import React from 'react';
import './App.css';
import firebase from "./firebase";
import Task from "./Task";
import { Paper, Tooltip, Container , Input , Button } from '@material-ui/core';

function App() {

  const [newtask, setnewtask] = React.useState("");
  const [Tasks, setTasks] = React.useState([]);
  const createTask = async () => {

    const db = firebase.firestore();
    db.collection('tasks').add({ task: newtask, iscompleted: false });
    setnewtask("");
  }

  React.useEffect(() => {

    async function fetchdata() {
      try {
        const db = firebase.firestore();
        const data = await db.collection('tasks').get();

        setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      } catch (e) {
        console.log(e);
      }
    }

    fetchdata();
  }, [])
  return (
    <>
      <Paper className='app' elevation={3}>
        <Container className = 'add-task'>
          <Input required={true} placeholder="Create a task" value={newtask} onChange={(e) => setnewtask(e.target.value)} />
          <Tooltip title="Add Task">
            <Button variant='contained' onClick={createTask} color = 'primary' style = {{background: '#38b000'}}>Add Task</Button>
          </Tooltip>
        </Container>
        <Container className = "task-holder" style={{'margin-top': '20px', padding: '15px 15px' }} maxWidth='sm'>
          {Tasks ?
            Tasks.map((task, index) => {
              return <Task taskdata={task} key={index} />
            })
            : null}
        </Container>
      </Paper>
    </>
  );
}

export default App;

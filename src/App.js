import React from 'react';
import './App.css';
import firebase from "./firebase";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { Paper, Tooltip, Container , Input , Button } from '@material-ui/core';

function App() {


  const [Tasks, setTasks] = React.useState([]);

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
        <CreateTask/>        
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

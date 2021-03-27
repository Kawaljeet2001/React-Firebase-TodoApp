import React from 'react';
import './App.css';
import firebase from "./firebase";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { Paper, Tooltip, Container , Input , Button } from '@material-ui/core';

function App() {


  const [Tasks, setTasks] = React.useState([]);
  const [togglecreated , settogglecreated] = React.useState(false);

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
  }, [togglecreated])
  return (
    <>
      <Paper className='app' elevation={3}>
        <CreateTask toggle = {(e) => {settogglecreated(!togglecreated)}}/>        
        <Container className = "task-holder" style={{'margin-top': '20px', padding: '15px 15px' }} maxWidth='sm'>
          {Tasks ?
            Tasks.map((task, index) => {
              return <Task toggle = {(e) => {settogglecreated(!togglecreated)}} taskdata={task} key={index} />
            })
            : null}
        </Container>
      </Paper>
     </>
  );
}

export default App;

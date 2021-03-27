import React from 'react';
import './App.css';
import firebase from "./firebase";
import Task from "./Task";
import { Container , Input , Button } from '@material-ui/core';

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
    <div className="App">
      <Container maxWidth = 'sm'  style = {{'margin-top' : '40px'}}>
        <Input variant = 'contained' required = {true} placeholder="Enter a task" value={newtask} onChange={(e) => setnewtask(e.target.value)}/>
        <Button variant = 'contained' onClick={createTask} color = 'primary'>Add Task</Button>
        <Container  style = {{border: '1px solid black', 'margin-top' : '20px', padding: '15px 0px'}} maxWidth = 'sm'>
          {Tasks ?
            Tasks.map((task, index) => {
              return <Task taskdata={task} key={index} />
            })
            : null}
        </Container>
      </Container>
    </div>
  );
}

export default App;

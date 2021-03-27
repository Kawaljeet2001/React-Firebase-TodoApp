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
      <Container>
        <Input variant = 'contained' required = {true} placeholder="Enter a task" value={newtask} onChange={(e) => setnewtask(e.target.value)}/>
        <Button variant = 'contained' onClick={createTask} color = 'primary'>Add Task</Button>
        <Container>
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

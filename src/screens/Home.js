import { useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useUser } from '../context/useUser';

const url = 'http://localhost:3001/';

function Home() {
  const { user } = useUser
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    const headers = {headers: {Authorization: user.token}};

    axios.post(url + '/create', {
      description: task
    }, headers)
    .then(response => {
    setTasks([...tasks, task])
    setTask('')
    }); //error handling?

  const deleteTask = (id) => {
    const headers = {headers: {Authorization: user.token}};
    axios.delete(url + '/delete/' + id, headers)
    .then(response => {
      const withoutRemoved = tasks.filter((item) => item !== id)
      setTasks(withoutRemoved)
    }); //error handling?
    }

  return (
   <div id ="container">
     <h3>ToDos</h3>
     <form>
      <input placeholder="Add new task"
      value={task}
      onChange={e => setTask(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault()
          addTask()
        }
      }}
      />
     </form>
     <ul>
       {
       tasks.map(item => (
         <li>{item}
         <button className="delete-button" onClick={() => deleteTask(item)}>
          Delete
         </button>
         </li>
       ))
     }
     </ul>
   </div>
  );
  }

}

export default Home;

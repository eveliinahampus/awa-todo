import React from "react";
import ReactDOM from "react-dom/client";
import Home from './screens/Home';
import Authentication, {AuthenticationMode} from './screens/Authentication';
import ErrorPage from "./screens/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './context/UserProvider';
import axios from 'axios';
import { useState, useEffect } from 'react';

const router = createBrowserRouter([
  {
  errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.Login} />,
  },
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.Register} />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);



const url = 'http://localhost:3001/';

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
    }, []);

    <ul>
      {
        tasks.map(item => (
          <li key={item.id} > {item.description}
            <button className='delete-button' onClick={() => deleteTask(item.id)}>
              Delete
            </button>
          </li>
        ))
      }
    </ul>

    const addTask = () => {
      axios.post(url + 'create', {
        description: task
      }).then(response => {
        setTasks([...tasks,  {id:response.data.id, description: task}])
        setTask('')
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
    }

    const deleteTask = (id) => {
      axios.delete(url + 'delete/' + id)
        .then(response => {
          const withoutRemoved = tasks.filter((item) => item.id !== id)
          setTasks(withoutRemoved)
        }).catch(error => {
          alert(error.response.data.error ? error.response.data.error : error)
          })
          }}

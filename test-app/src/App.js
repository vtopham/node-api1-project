import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import ViewUsers from './components/ViewUsers'
import AddUser from './components/AddUser'



function App() {

  const [users, setUsers] = useState([])

  useEffect( _ => {
    axios.get(`http://localhost:8000/api/users`)
    .then(res => {
      setUsers(res.data)
    })
  },[])

  return (
    <div className="App">
      
      <AddUser />
      <ViewUsers users = {users}/>
      
    </div>
  );
}

export default App;

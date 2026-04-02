import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { server } from './utils/server'

function App() {
  const data = [
    { id: 1, name: "John Doe", age: 24, contact: "07123456789" },
    { id: 2, name: "Alice Smith", age: 29, contact: "07987654321" },
    { id: 3, name: "Michael Brown", age: 32, contact: "07876543210" },
    { id: 4, name: "Emma Wilson", age: 26, contact: "07765432109" }
  ];
  const [users, setUsers] = useState([])

  const [input, setInputs] = useState({})

  // this function handles the change in the inputs
  function handleChange(e) {
    setInputs({ ...input, [e.target.name]: e.target.value })

  }

  async function handleSubmit() {
    console.log(input)
    await axios.post(`${server}/add-data`, input).then((res) => {
      console.log(res.data)
      setUsers([...users, input])
    })

  }

  // delete particular user
  async function deleteUser(id) {
    console.log(id)
    await axios.delete(`${server}/delete-user/${id}`).then((res) => {
      console.log(res.data)
      setUsers(users.filter(user => user._id !== id));
    })
  }

  // fetching the all user from the database
  useEffect(() => {
    axios.get('http://localhost:5000/get-all-data').then((res) => {
      setUsers(res.data.user)
      console.log(res.data.user)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="heading">CRUD APP</h1>

      {/* Dummy Form UI */}
      <div className="form-container">
        <input type='text' name='name' onChange={handleChange} placeholder="Enter name" />
        <input type='number' name='age' onChange={handleChange} placeholder="Enter age" />
        <input type='text' name='contact' onChange={handleChange} placeholder="Enter contact" />
        <button className="submit-btn" onClick={handleSubmit}>Add</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.contact}</td>
                <td>
                  <button className="update-btn">Update</button>
                  <button className="delete-btn" onClick={() => { deleteUser(item._id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

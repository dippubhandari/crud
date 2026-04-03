import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { server } from './utils/server'

function App() {
  const [users, setUsers] = useState([])
  const [input, setInputs] = useState({})

  function handleChange(e) {
    setInputs({ ...input, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', input.name)
    formData.append('age', input.age)
    formData.append('contact', input.contact)
    formData.append('image', input.image)
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // console.log(input)
    await axios.post(`${server}/add-data`, formData).then((res) => {
      console.log(res.data)
    })
  }

  async function deleteUser(id) {
    await axios.delete(`${server}/delete-user/${id}`).then(() => {
      setUsers(users.filter(user => user._id !== id));
    })
  }
  // handling the image
  function handleImage(e) {
    const image = e.target.files[0]
    console.log(image)
    setInputs({ ...input, [e.target.name]: image })
  }
  useEffect(() => {
    axios.get('http://localhost:5000/get-all-data').then((res) => {
      console.log(res.data)
      setUsers(res.data.user)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="heading">CRUD APP</h1>

      <form action="" encType='multipart/form-data'>
        <div className="form-container">
          <input type='text' name='name' onChange={handleChange} placeholder="Enter name" />
          <input type='number' name='age' onChange={handleChange} placeholder="Enter age" />
          <input type='text' name='contact' onChange={handleChange} placeholder="Enter contact" />

          {/* NEW IMAGE INPUT */}
          <input onChange={handleImage} name='image' type='file' accept='image/*' />

          <button type='submit' className="submit-btn" onClick={handleSubmit}>Add</button>
        </div>
      </form>

      {/* Preview Image (optional but cool) */}
      {input.image && (
        <div style={{ textAlign: 'center' }}>
          <p>Preview:</p>
          <img src={input.image} alt="preview" className="avatar" />
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image ? `${server}/${item.image}` : "https://i.pravatar.cc/150"}
                    alt="user"
                    className="avatar"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.contact}</td>
                <td>
                  <button className="update-btn">Update</button>
                  <button className="delete-btn" onClick={() => deleteUser(item._id)}>Delete</button>
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
